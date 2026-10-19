/**
 * useSortingFlow — central hook for the participant journey.
 *
 * Manages the full API-connected flow:
 *   1. registerParticipant()  → POST /api/participants
 *   2. getQuestions()         → GET  /api/questions
 *   3. submitSorting()        → POST /api/sort
 *
 * Design decisions:
 * - Backend questions are fetched once on mount and cached in state.
 * - Answer selections are tracked by backend question UUID → answer UUID.
 * - On submit, the hook posts backend UUIDs; the result (department slug +
 *   scores) is stored and returned to the UI.
 * - All loading / error states are surfaced as clean booleans / strings.
 * - The hook is backend-first but degrades gracefully: if the backend is
 *   offline, `backendAvailable` will be false and the parent can fall back
 *   to local mode.
 */

import { useState, useEffect, useCallback } from 'react';
import { DepartmentId } from '../types';
import {
  apiService,
  BackendQuestion,
  BackendParticipant,
  BackendSortResult,
} from '../services/api';

// ── Shape of the hook's return value ─────────────────────────────────────────

export interface UseSortingFlowReturn {
  // Backend availability
  backendAvailable: boolean;
  backendChecking: boolean;

  // Questions (from backend)
  backendQuestions: BackendQuestion[];
  questionsLoading: boolean;
  questionsError: string | null;

  // Registration
  registerParticipant: (data: {
    fullName: string;
    email: string;
    studyYear: string;
  }) => Promise<BackendParticipant | null>;
  registrationLoading: boolean;
  registrationError: string | null;

  // Stored participant from backend
  backendParticipant: BackendParticipant | null;

  // Answer tracking: backendQuestionId → backendAnswerId
  backendAnswers: Record<string, string>;
  selectAnswer: (questionId: string, answerId: string) => void;

  // Sorting submission
  submitSorting: () => Promise<BackendSortResult | null>;
  sortingLoading: boolean;
  sortingError: string | null;

  // Result
  sortResult: BackendSortResult | null;
  departmentResult: DepartmentId | null;
  scores: Record<DepartmentId, number>;

  // Reset for a new participant
  reset: () => void;
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useSortingFlow(): UseSortingFlowReturn {
  // Backend reachability
  const [backendAvailable, setBackendAvailable] = useState(false);
  const [backendChecking, setBackendChecking] = useState(true);

  // Questions
  const [backendQuestions, setBackendQuestions] = useState<BackendQuestion[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  // Registration
  const [backendParticipant, setBackendParticipant] = useState<BackendParticipant | null>(null);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  // Answer selections (backend UUIDs)
  const [backendAnswers, setBackendAnswers] = useState<Record<string, string>>({});

  // Sorting
  const [sortResult, setSortResult] = useState<BackendSortResult | null>(null);
  const [sortingLoading, setSortingLoading] = useState(false);
  const [sortingError, setSortingError] = useState<string | null>(null);

  // ── Health check on mount ──────────────────────────────────────────────

  useEffect(() => {
    let mounted = true;
    (async () => {
      setBackendChecking(true);
      try {
        await apiService.checkHealth();
        if (mounted) setBackendAvailable(true);
      } catch {
        if (mounted) setBackendAvailable(false);
      } finally {
        if (mounted) setBackendChecking(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ── Fetch questions once backend is confirmed available ────────────────

  useEffect(() => {
    if (!backendAvailable) return;
    let mounted = true;
    (async () => {
      setQuestionsLoading(true);
      setQuestionsError(null);
      try {
        const qs = await apiService.getQuestions();
        if (mounted) setBackendQuestions(qs);
      } catch (err: any) {
        if (mounted) setQuestionsError(err?.message ?? 'Failed to load questions.');
      } finally {
        if (mounted) setQuestionsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [backendAvailable]);

  // ── Register participant ───────────────────────────────────────────────

  const registerParticipant = useCallback(
    async (data: { fullName: string; email: string; studyYear: string }) => {
      setRegistrationLoading(true);
      setRegistrationError(null);
      try {
        const participant = await apiService.registerParticipant(data);
        setBackendParticipant(participant);
        return participant;
      } catch (err: any) {
        const msg = err?.message ?? 'Registration failed.';
        setRegistrationError(msg);
        return null;
      } finally {
        setRegistrationLoading(false);
      }
    },
    []
  );

  // ── Record an answer selection ─────────────────────────────────────────

  const selectAnswer = useCallback((questionId: string, answerId: string) => {
    setBackendAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  }, []);

  // ── Submit sorting ─────────────────────────────────────────────────────

  const submitSorting = useCallback(async () => {
    if (!backendParticipant) {
      setSortingError('No registered participant session. Please register first.');
      return null;
    }

    const responses = Object.entries(backendAnswers).map(([question_id, answer_id]) => ({
      question_id,
      answer_id,
    }));

    setSortingLoading(true);
    setSortingError(null);
    try {
      const result = await apiService.submitSorting(backendParticipant.id, responses);
      setSortResult(result);
      return result;
    } catch (err: any) {
      const msg = err?.message ?? 'Sorting submission failed.';
      setSortingError(msg);
      return null;
    } finally {
      setSortingLoading(false);
    }
  }, [backendParticipant, backendAnswers]);

  // ── Derive department / scores from result ─────────────────────────────

  const departmentResult: DepartmentId | null = sortResult
    ? (sortResult.department.slug as DepartmentId)
    : null;

  const scores: Record<DepartmentId, number> = {
    development: sortResult?.scores?.development ?? 0,
    design: sortResult?.scores?.design ?? 0,
    events: sortResult?.scores?.events ?? 0,
    social_media: sortResult?.scores?.social_media ?? 0,
  };

  // ── Reset for a new participant ────────────────────────────────────────

  const reset = useCallback(() => {
    setBackendParticipant(null);
    setBackendAnswers({});
    setSortResult(null);
    setSortingError(null);
    setRegistrationError(null);
  }, []);

  return {
    backendAvailable,
    backendChecking,
    backendQuestions,
    questionsLoading,
    questionsError,
    registerParticipant,
    registrationLoading,
    registrationError,
    backendParticipant,
    backendAnswers,
    selectAnswer,
    submitSorting,
    sortingLoading,
    sortingError,
    sortResult,
    departmentResult,
    scores,
    reset,
  };
}
