/**
 * useAdminStats — fetches live statistics and participant list from the backend.
 *
 * Used by Screen9AdminDashboard and AdminApp to replace hardcoded numbers
 * with real data from GET /api/admin/statistics and GET /api/admin/participants.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  apiService,
  BackendAdminStats,
  BackendAdminParticipant,
  BackendAdminResult,
} from '../services/api';

export interface UseAdminStatsReturn {
  stats: BackendAdminStats | null;
  statsLoading: boolean;
  statsError: string | null;

  participants: BackendAdminParticipant[];
  participantsLoading: boolean;
  participantsError: string | null;

  results: BackendAdminResult[];
  resultsLoading: boolean;
  resultsError: string | null;

  refresh: () => void;
}

export function useAdminStats(): UseAdminStatsReturn {
  const [stats, setStats] = useState<BackendAdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [participants, setParticipants] = useState<BackendAdminParticipant[]>([]);
  const [participantsLoading, setParticipantsLoading] = useState(true);
  const [participantsError, setParticipantsError] = useState<string | null>(null);

  const [results, setResults] = useState<BackendAdminResult[]>([]);
  const [resultsLoading, setResultsLoading] = useState(true);
  const [resultsError, setResultsError] = useState<string | null>(null);

  const [tick, setTick] = useState(0);
  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let mounted = true;

    // Stats
    setStatsLoading(true);
    setStatsError(null);
    apiService
      .getAdminStatistics()
      .then((s) => { if (mounted) setStats(s); })
      .catch((e) => { if (mounted) setStatsError(e?.message ?? 'Failed to load statistics.'); })
      .finally(() => { if (mounted) setStatsLoading(false); });

    // Participants
    setParticipantsLoading(true);
    setParticipantsError(null);
    apiService
      .getAdminParticipants(100)
      .then((p) => { if (mounted) setParticipants(p); })
      .catch((e) => { if (mounted) setParticipantsError(e?.message ?? 'Failed to load participants.'); })
      .finally(() => { if (mounted) setParticipantsLoading(false); });

    // Results
    setResultsLoading(true);
    setResultsError(null);
    apiService
      .getAdminResults(100)
      .then((r) => { if (mounted) setResults(r); })
      .catch((e) => { if (mounted) setResultsError(e?.message ?? 'Failed to load results.'); })
      .finally(() => { if (mounted) setResultsLoading(false); });

    return () => { mounted = false; };
  }, [tick]);

  return {
    stats,
    statsLoading,
    statsError,
    participants,
    participantsLoading,
    participantsError,
    results,
    resultsLoading,
    resultsError,
    refresh,
  };
}
