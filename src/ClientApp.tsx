/**
 * ClientApp — participant-facing application.
 *
 * API integration points:
 *
 *  Screen 3 (personal_info) → handleRegister()
 *    Calls POST /api/participants on form submit.
 *    On success, navigates to questionnaire.
 *    On failure, shows an inline error banner.
 *
 *  Screen 4 (questionnaire)
 *    Questions rendered from backend GET /api/questions (via useSortingFlow).
 *    Local QUESTIONS array is kept as UI-only fallback for icons / display order.
 *    Answer selections track backend UUIDs (question_id → answer_id).
 *
 *  handleSubmitQuestionnaire()
 *    Calls POST /api/sort with backend UUIDs.
 *    On success, stores backend result and transitions to sorting_animation.
 *    On failure, shows error and stays on questionnaire.
 *
 * When the backend is unreachable, backendAvailable = false and the app
 * falls back to the local calculateSortingResult() path so the UI always works.
 */

import { useState, useCallback } from 'react';
import { DepartmentId, ParticipantInfo, ScreenId } from './types';
import { INITIAL_PARTICIPANTS } from './data/initialParticipants';
import { calculateSortingResult, QUESTIONS } from './data/questions';
import { sounds } from './utils/audio';
import { useSortingFlow } from './hooks/useSortingFlow';

// Components
import { MagicalBackground } from './components/MagicalBackground';
import { Navbar } from './components/Navbar';
import { ScreenSwitcherBar } from './components/ScreenSwitcherBar';
import { JoinModal } from './components/JoinModal';
import { ApiConnectorModal } from './components/ApiConnectorModal';

// Client Screens
import { Screen1Landing } from './screens/Screen1Landing';
import { Screen2Welcome } from './screens/Screen2Welcome';
import { Screen3PersonalInfo } from './screens/Screen3PersonalInfo';
import { Screen4Questionnaire } from './screens/Screen4Questionnaire';
import { Screen5SortingAnimation } from './screens/Screen5SortingAnimation';
import { Screen6SortingResult } from './screens/Screen6SortingResult';
import { Screen7DepartmentsOverview } from './screens/Screen7DepartmentsOverview';
import { Screen8DepartmentDetail } from './screens/Screen8DepartmentDetail';
import { Screen10MemberProfile } from './screens/Screen10MemberProfile';
import { Screen11EventMode } from './screens/Screen11EventMode';
import { Screen12MobileFlow } from './screens/Screen12MobileFlow';

type ClientScreenId = Exclude<ScreenId, 'admin_dashboard'>;

export default function ClientApp() {
  const [currentScreen, setCurrentScreen] = useState<ClientScreenId>('landing');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // ── Backend integration hook ───────────────────────────────────────────
  const {
    backendAvailable,
    backendQuestions,
    registerParticipant,
    registrationLoading,
    registrationError,
    backendParticipant,
    backendAnswers,
    selectAnswer: selectBackendAnswer,
    submitSorting,
    sortingLoading,
    sortingError,
    departmentResult: backendDeptResult,
    scores: backendScores,
  } = useSortingFlow();

  // ── Local UI state (form + answers + result) ───────────────────────────
  const [participant, setParticipant] = useState<ParticipantInfo>({
    id: '',
    fullName: '',
    email: '',
    faculty: 'Computer Science Department',
    studyYear: 'Master 1',
    createdAt: '',
    status: 'In Progress',
  });

  // Local answers: questionIndex(0-based) → local optionId (e.g. 'q1_o1')
  // Used for UI rendering; backend answers are tracked separately.
  const [localAnswers, setLocalAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Final results (either from backend or local fallback)
  const [departmentResult, setDepartmentResult] = useState<DepartmentId>('development');
  const [scores, setScores] = useState<Record<DepartmentId, number>>({
    development: 0, design: 0, events: 0, social_media: 0,
  });

  const [selectedDeptDetail, setSelectedDeptDetail] = useState<DepartmentId>('development');

  // Participants list (still used by JoinModal / EventMode)
  const [participantsList, setParticipantsList] = useState<ParticipantInfo[]>(() => {
    try {
      const saved = localStorage.getItem('sdg_participants');
      return saved ? JSON.parse(saved) : INITIAL_PARTICIPANTS;
    } catch {
      return INITIAL_PARTICIPANTS;
    }
  });

  // API submit error shown in UI
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Navigation ─────────────────────────────────────────────────────────
  const handleNavigate = (screen: ScreenId) => {
    if (screen === 'admin_dashboard') { window.location.href = '/admin'; return; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen as ClientScreenId);
  };

  const handleUpdateParticipant = (data: Partial<ParticipantInfo>) => {
    setParticipant((prev) => ({ ...prev, ...data }));
  };

  // ── Screen 3 → Register with backend, then navigate to questionnaire ───
  const handlePersonalInfoNext = useCallback(async () => {
    sounds.playClick();
    setSubmitError(null);

    if (backendAvailable) {
      const bp = await registerParticipant({
        fullName: participant.fullName,
        email: participant.email,
        studyYear: participant.studyYear,
      });
      if (!bp) {
        // registrationError is set inside useSortingFlow; show it
        return; // stay on Screen 3
      }
      // Update local participant id from backend
      setParticipant((prev) => ({ ...prev, id: bp.id, createdAt: bp.created_at }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen('questionnaire');
  }, [backendAvailable, participant, registerParticipant]);

  // ── Screen 4 → answer selection ───────────────────────────────────────
  const handleSelectOption = useCallback(
    (questionIndex: number, localOptionId: string) => {
      // Track local option for UI rendering
      setLocalAnswers((prev) => ({ ...prev, [questionIndex]: localOptionId }));

      // Also track backend UUID if backend questions are loaded
      if (backendAvailable && backendQuestions.length > 0) {
        const backendQ = backendQuestions[questionIndex];
        if (backendQ) {
          // Map local option position to backend answer by display_order
          const localQ = QUESTIONS[questionIndex];
          const localOptIndex = localQ?.options.findIndex((o) => o.id === localOptionId) ?? -1;
          const sortedAnswers = [...backendQ.answers].sort(
            (a, b) => a.display_order - b.display_order
          );
          const backendAns = sortedAnswers[localOptIndex];
          if (backendAns) {
            selectBackendAnswer(backendQ.id, backendAns.id);
          }
        }
      }
    },
    [backendAvailable, backendQuestions, selectBackendAnswer]
  );

  // ── Screen 4 → submit questionnaire ───────────────────────────────────
  const handleSubmitQuestionnaire = useCallback(async () => {
    setSubmitError(null);

    if (backendAvailable && backendParticipant) {
      // Backend path
      const result = await submitSorting();
      if (!result) {
        setSubmitError(sortingError ?? 'Sorting submission failed. Please try again.');
        return;
      }
      // Apply backend result
      const deptSlug = result.department.slug as DepartmentId;
      setDepartmentResult(deptSlug);
      setScores({
        development: result.scores.development ?? 0,
        design: result.scores.design ?? 0,
        events: result.scores.events ?? 0,
        social_media: result.scores.social_media ?? 0,
      });
      setParticipant((prev) => ({
        ...prev,
        department: deptSlug,
        scores: {
          development: result.scores.development ?? 0,
          design: result.scores.design ?? 0,
          events: result.scores.events ?? 0,
          social_media: result.scores.social_media ?? 0,
        },
        status: 'Completed',
      }));
    } else {
      // Local fallback — backend offline or participant not registered yet
      const calc = calculateSortingResult(localAnswers);
      setDepartmentResult(calc.departmentId);
      setScores(calc.scores);
      setParticipant((prev) => ({
        ...prev,
        department: calc.departmentId,
        scores: calc.scores,
        status: 'Completed',
      }));
    }

    // Add to local participants list
    setParticipantsList((prev) => {
      const updated: ParticipantInfo = {
        ...participant,
        id: participant.id || `local_${Date.now()}`,
        createdAt: participant.createdAt || 'Just now',
      };
      return [updated, ...prev.filter((p) => p.email !== updated.email)];
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen('sorting_animation');
  }, [
    backendAvailable, backendParticipant, submitSorting,
    sortingError, localAnswers, participant,
  ]);

  const handleSortingAnimationComplete = () => setCurrentScreen('sorting_result');

  const handleNextQuestion = () =>
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, QUESTIONS.length - 1));

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setCurrentScreen('personal_info');
    }
  };

  const handleJoinModalSuccess = (data: { name: string; email: string; dept: DepartmentId }) => {
    const newEntry: ParticipantInfo = {
      id: `local_${Date.now()}`,
      fullName: data.name,
      email: data.email,
      faculty: 'Computer Science Department',
      studyYear: 'Licence 3',
      createdAt: 'Just now',
      department: data.dept,
      status: 'Completed',
      scores: { development: 50, design: 50, events: 50, social_media: 50 },
    };
    setParticipantsList((prev) => [newEntry, ...prev]);
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#08090d] text-[#e2d9c8] flex flex-col relative selection:bg-amber-600/30 selection:text-amber-200">
      <MagicalBackground />

      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
        onOpenApiConnector={() => setIsApiModalOpen(true)}
      />

      <main className="relative z-10 flex-1 flex flex-col">
        {currentScreen === 'landing' && (
          <Screen1Landing
            onStartJourney={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentScreen('welcome'); }}
            onExploreDepartments={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentScreen('departments_overview'); }}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'welcome' && (
          <Screen2Welcome
            onNext={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentScreen('personal_info'); }}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'personal_info' && (
          <>
            {/* Inline error banner for registration failure */}
            {(registrationError || submitError) && (
              <div className="max-w-xl mx-auto mt-4 px-4">
                <div className="bg-rose-950/60 border border-rose-500/40 text-rose-300 text-sm rounded-xl px-4 py-3">
                  ⚠ {registrationError || submitError}
                </div>
              </div>
            )}
            <Screen3PersonalInfo
              participant={participant}
              onUpdateParticipant={handleUpdateParticipant}
              onNext={handlePersonalInfoNext}
              onPrevious={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentScreen('welcome'); }}
              onNavigate={handleNavigate}
              isLoading={registrationLoading}
            />
          </>
        )}

        {currentScreen === 'questionnaire' && (
          <>
            {(submitError || sortingError) && (
              <div className="max-w-xl mx-auto mt-4 px-4">
                <div className="bg-rose-950/60 border border-rose-500/40 text-rose-300 text-sm rounded-xl px-4 py-3">
                  ⚠ {submitError || sortingError}
                </div>
              </div>
            )}
            <Screen4Questionnaire
              currentQuestionIndex={currentQuestionIndex}
              answers={localAnswers}
              onSelectOption={handleSelectOption}
              onNextQuestion={handleNextQuestion}
              onPreviousQuestion={handlePreviousQuestion}
              onSubmitQuestionnaire={handleSubmitQuestionnaire}
              onNavigate={handleNavigate}
              isSubmitting={sortingLoading}
            />
          </>
        )}

        {currentScreen === 'sorting_animation' && (
          <Screen5SortingAnimation
            answers={localAnswers}
            scores={scores}
            departmentResult={departmentResult}
            onComplete={handleSortingAnimationComplete}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'sorting_result' && (
          <Screen6SortingResult
            departmentId={departmentResult}
            scores={scores}
            onExploreDepartments={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentScreen('departments_overview'); }}
            onGoToProfile={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentScreen('member_profile'); }}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'departments_overview' && (
          <Screen7DepartmentsOverview
            onSelectDepartment={(deptId) => { setSelectedDeptDetail(deptId); window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentScreen('department_detail'); }}
            onTakeTest={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentScreen('welcome'); }}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'department_detail' && (
          <Screen8DepartmentDetail
            departmentId={selectedDeptDetail}
            onBack={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentScreen('departments_overview'); }}
            onApply={() => setIsJoinModalOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'member_profile' && (
          <Screen10MemberProfile participant={participant} onNavigate={handleNavigate} />
        )}

        {currentScreen === 'event_mode' && (
          <Screen11EventMode
            onStartTest={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentScreen('welcome'); }}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'mobile_flow' && (
          <Screen12MobileFlow onNavigate={handleNavigate} />
        )}
      </main>

      <ScreenSwitcherBar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          if (screen === 'admin_dashboard') { window.location.href = '/admin'; return; }
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentScreen(screen as ClientScreenId);
        }}
      />

      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSuccess={handleJoinModalSuccess}
      />

      <ApiConnectorModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
    </div>
  );
}
