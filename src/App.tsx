import { useState, useEffect } from 'react';
import { DepartmentId, ParticipantInfo, ScreenId } from './types';
import { INITIAL_PARTICIPANTS } from './data/initialParticipants';
import { calculateSortingResult } from './data/questions';
import { sounds } from './utils/audio';

// Components
import { MagicalBackground } from './components/MagicalBackground';
import { Navbar } from './components/Navbar';
import { ScreenSwitcherBar } from './components/ScreenSwitcherBar';
import { JoinModal } from './components/JoinModal';

// 12 Screens
import { Screen1Landing } from './screens/Screen1Landing';
import { Screen2Welcome } from './screens/Screen2Welcome';
import { Screen3PersonalInfo } from './screens/Screen3PersonalInfo';
import { Screen4Questionnaire } from './screens/Screen4Questionnaire';
import { Screen5SortingAnimation } from './screens/Screen5SortingAnimation';
import { Screen6SortingResult } from './screens/Screen6SortingResult';
import { Screen7DepartmentsOverview } from './screens/Screen7DepartmentsOverview';
import { Screen8DepartmentDetail } from './screens/Screen8DepartmentDetail';
import { Screen9AdminDashboard } from './screens/Screen9AdminDashboard';
import { Screen10MemberProfile } from './screens/Screen10MemberProfile';
import { Screen11EventMode } from './screens/Screen11EventMode';
import { Screen12MobileFlow } from './screens/Screen12MobileFlow';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Participant form state
  const [participant, setParticipant] = useState<ParticipantInfo>({
    id: 'part_current',
    fullName: 'Brahim Mihoubi',
    email: 'brahim.m@univ-setif.dz',
    faculty: 'Computer Science Department',
    studyYear: 'Master 1',
    createdAt: 'Just now',
    department: 'development',
    status: 'Completed',
  });

  // Questionnaire answers state: questionId -> optionId
  const [answers, setAnswers] = useState<Record<number, string>>({
    1: 'q1_o1',
    2: 'q2_o1',
    3: 'q3_o1',
    4: 'q4_o1',
    5: 'q5_o1',
    6: 'q6_o1',
    7: 'q7_o1',
    8: 'q8_o1',
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Sorting results
  const [departmentResult, setDepartmentResult] = useState<DepartmentId>('development');
  const [scores, setScores] = useState<Record<DepartmentId, number>>({
    development: 87,
    design: 26,
    events: 22,
    social_media: 14,
  });

  // Selected department for Screen 8 detail view
  const [selectedDeptDetail, setSelectedDeptDetail] = useState<DepartmentId>('development');

  // Participants list for Admin Dashboard
  const [participantsList, setParticipantsList] = useState<ParticipantInfo[]>(() => {
    try {
      const saved = localStorage.getItem('sdg_participants');
      return saved ? JSON.parse(saved) : INITIAL_PARTICIPANTS;
    } catch {
      return INITIAL_PARTICIPANTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sdg_participants', JSON.stringify(participantsList));
    } catch {
      // ignore
    }
  }, [participantsList]);

  // Handlers
  const handleUpdateParticipant = (data: Partial<ParticipantInfo>) => {
    setParticipant((prev) => ({ ...prev, ...data }));
  };

  const handleSelectOption = (questionId: number, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, 7));
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setCurrentScreen('personal_info');
    }
  };

  const handleSubmitQuestionnaire = () => {
    const calc = calculateSortingResult(answers);
    setDepartmentResult(calc.departmentId);
    setScores(calc.scores);

    // Save to participant
    const updated: ParticipantInfo = {
      ...participant,
      id: `part_${Date.now()}`,
      department: calc.departmentId,
      scores: calc.scores,
      createdAt: 'Just now',
      status: 'Completed',
    };
    setParticipant(updated);

    // Add to participants list
    setParticipantsList((prev) => [updated, ...prev.filter((p) => p.email !== updated.email)]);

    // Move to sorting animation
    setCurrentScreen('sorting_animation');
  };

  const handleSortingAnimationComplete = () => {
    setCurrentScreen('sorting_result');
  };

  const handleAddParticipant = (newP: ParticipantInfo) => {
    setParticipantsList((prev) => [newP, ...prev]);
  };

  const handleJoinModalSuccess = (data: { name: string; email: string; dept: DepartmentId }) => {
    const newEntry: ParticipantInfo = {
      id: `part_${Date.now()}`,
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

  return (
    <div className="min-h-screen bg-[#08090d] text-[#e2d9c8] flex flex-col relative selection:bg-amber-600/30 selection:text-amber-200">
      {/* Mystical Canvas Background with Golden Embers */}
      <MagicalBackground />

      {/* Top Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentScreen(screen);
        }}
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="relative z-10 flex-1 flex flex-col">
        {currentScreen === 'landing' && (
          <Screen1Landing
            onStartJourney={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('welcome');
            }}
            onExploreDepartments={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('departments_overview');
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'welcome' && (
          <Screen2Welcome
            onNext={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('personal_info');
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'personal_info' && (
          <Screen3PersonalInfo
            participant={participant}
            onUpdateParticipant={handleUpdateParticipant}
            onNext={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('questionnaire');
            }}
            onPrevious={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('welcome');
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'questionnaire' && (
          <Screen4Questionnaire
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            onPreviousQuestion={handlePreviousQuestion}
            onSubmitQuestionnaire={handleSubmitQuestionnaire}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'sorting_animation' && (
          <Screen5SortingAnimation
            onComplete={handleSortingAnimationComplete}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'sorting_result' && (
          <Screen6SortingResult
            departmentId={departmentResult}
            scores={scores}
            onExploreDepartments={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('departments_overview');
            }}
            onGoToProfile={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('member_profile');
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'departments_overview' && (
          <Screen7DepartmentsOverview
            onSelectDepartment={(deptId) => {
              setSelectedDeptDetail(deptId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('department_detail');
            }}
            onTakeTest={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('welcome');
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'department_detail' && (
          <Screen8DepartmentDetail
            departmentId={selectedDeptDetail}
            onBack={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('departments_overview');
            }}
            onApply={() => setIsJoinModalOpen(true)}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'admin_dashboard' && (
          <Screen9AdminDashboard
            participants={participantsList}
            onNavigate={setCurrentScreen}
            onAddParticipant={handleAddParticipant}
          />
        )}

        {currentScreen === 'member_profile' && (
          <Screen10MemberProfile
            participant={participant}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'event_mode' && (
          <Screen11EventMode
            onStartTest={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentScreen('welcome');
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'mobile_flow' && (
          <Screen12MobileFlow onNavigate={setCurrentScreen} />
        )}
      </main>

      {/* Floating 12-Screen Directory Navigator */}
      <ScreenSwitcherBar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentScreen(screen);
        }}
      />

      {/* Join SDG Modal Dialog */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSuccess={handleJoinModalSuccess}
      />
    </div>
  );
}
