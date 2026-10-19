/**
 * SDG Sorting Hat — API Service Client
 *
 * Single source of truth for all communication with the FastAPI backend.
 * Uses VITE_API_BASE_URL from .env (falls back to http://localhost:8000/api).
 *
 * Public flow:
 *   1. registerParticipant()   → POST /api/participants
 *   2. getQuestions()          → GET  /api/questions
 *   3. submitSorting()         → POST /api/sort
 *   4. getResult()             → GET  /api/results/{id}   (optional)
 *
 * Admin flow:
 *   adminLogin()               → POST /api/admin/login
 *   getAdminStatistics()       → GET  /api/admin/statistics
 *   getAdminParticipants()     → GET  /api/admin/participants
 *   getAdminResults()          → GET  /api/admin/results
 *   … and full CRUD for departments / questions / answers / scoring rules
 */

// ── Base URL ────────────────────────────────────────────────────────────────

const DEFAULT_BASE = 'http://localhost:8000/api';

function resolveBaseUrl(): string {
  // 1. Vite env variable (set via .env → VITE_API_BASE_URL)
  const fromEnv = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
  if (fromEnv?.trim()) return fromEnv.trim().replace(/\/+$/, '');

  // 2. Runtime override stored by the ApiConnector modal
  const fromStorage = localStorage.getItem('sdg_api_base_url');
  if (fromStorage?.trim()) return fromStorage.trim().replace(/\/+$/, '');

  return DEFAULT_BASE;
}

// ── Public Types ─────────────────────────────────────────────────────────────

export interface HealthCheckResponse {
  status: string;
  service?: string;
  scoring_version?: string;
  database?: string;
}

/** A single answer option returned by the backend */
export interface BackendAnswer {
  id: string;
  text: string;
  display_order: number;
}

/** A single question returned by GET /api/questions */
export interface BackendQuestion {
  id: string;
  text: string;
  type: string;
  display_order: number;
  required: boolean;
  answers: BackendAnswer[];
}

/** Response body from POST /api/participants */
export interface BackendParticipant {
  id: string;
  full_name: string;
  email: string;
  academic_year: string;
  session_token: string;
  status: string;
  created_at: string;
}

/** Department summary embedded in a sort result */
export interface BackendDepartmentResult {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
  description?: string;
  short_description?: string;
}

/** Response body from POST /api/sort */
export interface BackendSortResult {
  result_id: string;
  department: BackendDepartmentResult;
  total_score: number;
  scores: Record<string, number>;
  scoring_version: string;
  already_completed?: boolean;
}

// ── Admin Types ───────────────────────────────────────────────────────────────

export interface AdminLoginResponse {
  access_token: string;
  token_type: string;
  admin_name: string;
  admin_email: string;
}

export interface BackendAdminStats {
  total_participants: number;
  completed_participants: number;
  in_progress_participants: number;
  completion_rate_percentage: number;
  department_distribution: Record<string, { count: number; percentage: number }>;
}

export interface BackendAdminParticipant {
  id: string;
  full_name: string;
  email: string;
  academic_year: string;
  status: string;
  created_at: string;
  completed_at?: string;
  department_name?: string;
  department_slug?: string;
}

export interface BackendAdminResult {
  id: string;
  participant_id: string;
  participant_name: string;
  participant_email: string;
  department_name: string;
  department_slug: string;
  total_score: number;
  scores_snapshot: Record<string, number>;
  scoring_version: string;
  created_at: string;
}

// ── ApiService Class ──────────────────────────────────────────────────────────

class ApiService {
  private _baseUrl: string;
  private _token: string | null;

  constructor() {
    this._baseUrl = resolveBaseUrl();
    this._token = localStorage.getItem('sdg_admin_token') || null;
  }

  // ── URL / token helpers ──────────────────────────────────────────────────

  public getBaseUrl(): string {
    return this._baseUrl;
  }

  /** Override the base URL at runtime (used by the ApiConnector modal). */
  public setBaseUrl(url: string): void {
    const clean = url.trim().replace(/\/+$/, '');
    this._baseUrl = clean;
    localStorage.setItem('sdg_api_base_url', clean);
  }

  public getToken(): string | null {
    return this._token;
  }

  public setToken(token: string | null): void {
    this._token = token;
    if (token) {
      localStorage.setItem('sdg_admin_token', token);
    } else {
      localStorage.removeItem('sdg_admin_token');
    }
  }

  // ── Core HTTP helper ─────────────────────────────────────────────────────

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this._baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };
    if (this._token) {
      headers['Authorization'] = `Bearer ${this._token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      let errorMessage = `API Error ${response.status}: ${response.statusText}`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail) {
          errorMessage =
            typeof errorJson.detail === 'string'
              ? errorJson.detail
              : JSON.stringify(errorJson.detail);
        }
      } catch {
        // use default message
      }
      throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
  }

  // ── PUBLIC ENDPOINTS ─────────────────────────────────────────────────────

  /** Health check — tries root /health first, then /api/health. */
  public async checkHealth(): Promise<HealthCheckResponse> {
    const rootUrl = this._baseUrl.replace(/\/api$/, '') + '/health';
    try {
      const res = await fetch(rootUrl, { signal: AbortSignal.timeout(3000) });
      if (res.ok) return res.json();
    } catch {
      // fall through
    }
    return this.request<HealthCheckResponse>('/health');
  }

  /**
   * GET /api/questions
   * Returns active questions with their answer options.
   * Scoring weights and hidden categories are NOT included.
   */
  public async getQuestions(): Promise<BackendQuestion[]> {
    return this.request<BackendQuestion[]>('/questions');
  }

  /**
   * POST /api/participants
   * Register a participant session before submitting the questionnaire.
   */
  public async registerParticipant(data: {
    fullName: string;
    email: string;
    studyYear: string;
  }): Promise<BackendParticipant> {
    return this.request<BackendParticipant>('/participants', {
      method: 'POST',
      body: JSON.stringify({
        full_name: data.fullName,
        email: data.email,
        academic_year: data.studyYear,
      }),
    });
  }

  /**
   * POST /api/sort
   * Submit questionnaire responses. The backend executes the weighted scoring
   * and returns the assigned department.
   */
  public async submitSorting(
    participantId: string,
    responses: { question_id: string; answer_id: string }[]
  ): Promise<BackendSortResult> {
    return this.request<BackendSortResult>('/sort', {
      method: 'POST',
      body: JSON.stringify({ participant_id: participantId, responses }),
    });
  }

  /**
   * GET /api/results/{result_id}
   * Retrieve a completed sorting result by its UUID.
   */
  public async getResult(resultId: string): Promise<BackendSortResult> {
    return this.request<BackendSortResult>(`/results/${resultId}`);
  }

  // ── ADMIN AUTHENTICATION ─────────────────────────────────────────────────

  public async adminLogin(email: string, password: string): Promise<AdminLoginResponse> {
    const res = await this.request<AdminLoginResponse>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.access_token) {
      this.setToken(res.access_token);
      localStorage.setItem('sdg_admin_name', res.admin_name);
      localStorage.setItem('sdg_admin_email', res.admin_email);
    }
    return res;
  }

  public async adminLogout(): Promise<void> {
    try {
      await this.request('/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    } finally {
      this.setToken(null);
      localStorage.removeItem('sdg_admin_name');
      localStorage.removeItem('sdg_admin_email');
    }
  }

  public async getAdminMe(): Promise<any> {
    return this.request<any>('/admin/me');
  }

  // ── ADMIN MANAGEMENT ─────────────────────────────────────────────────────

  /** GET /api/admin/statistics */
  public async getAdminStatistics(): Promise<BackendAdminStats> {
    return this.request<BackendAdminStats>('/admin/statistics');
  }

  /** GET /api/admin/participants */
  public async getAdminParticipants(
    limit = 50,
    skip = 0,
    statusFilter?: string
  ): Promise<BackendAdminParticipant[]> {
    let url = `/admin/participants?limit=${limit}&skip=${skip}`;
    if (statusFilter) url += `&status=${statusFilter}`;
    return this.request<BackendAdminParticipant[]>(url);
  }

  /** GET /api/admin/results */
  public async getAdminResults(limit = 50, skip = 0): Promise<BackendAdminResult[]> {
    return this.request<BackendAdminResult[]>(`/admin/results?limit=${limit}&skip=${skip}`);
  }

  /** GET /api/admin/departments */
  public async getAdminDepartments(): Promise<any[]> {
    return this.request<any[]>('/admin/departments');
  }

  /** POST /api/admin/departments */
  public async createDepartment(deptData: any): Promise<any> {
    return this.request<any>('/admin/departments', {
      method: 'POST',
      body: JSON.stringify(deptData),
    });
  }

  /** PUT /api/admin/departments/{id} */
  public async updateDepartment(deptId: string, deptData: any): Promise<any> {
    return this.request<any>(`/admin/departments/${deptId}`, {
      method: 'PUT',
      body: JSON.stringify(deptData),
    });
  }

  /** GET /api/admin/questions */
  public async getAdminQuestions(): Promise<any[]> {
    return this.request<any[]>('/admin/questions');
  }

  /** POST /api/admin/questions */
  public async createQuestion(qData: any): Promise<any> {
    return this.request<any>('/admin/questions', {
      method: 'POST',
      body: JSON.stringify(qData),
    });
  }

  /** PUT /api/admin/questions/{id} */
  public async updateQuestion(questionId: string, qData: any): Promise<any> {
    return this.request<any>(`/admin/questions/${questionId}`, {
      method: 'PUT',
      body: JSON.stringify(qData),
    });
  }

  /** POST /api/admin/answers */
  public async createAnswer(ansData: any): Promise<any> {
    return this.request<any>('/admin/answers', {
      method: 'POST',
      body: JSON.stringify(ansData),
    });
  }

  /** PUT /api/admin/answers/{id} */
  public async updateAnswer(answerId: string, ansData: any): Promise<any> {
    return this.request<any>(`/admin/answers/${answerId}`, {
      method: 'PUT',
      body: JSON.stringify(ansData),
    });
  }

  /** GET /api/admin/scoring-rules */
  public async getAdminScoringRules(): Promise<any[]> {
    return this.request<any[]>('/admin/scoring-rules');
  }

  /** POST /api/admin/scoring-rules */
  public async createScoringRule(ruleData: any): Promise<any> {
    return this.request<any>('/admin/scoring-rules', {
      method: 'POST',
      body: JSON.stringify(ruleData),
    });
  }

  /** PUT /api/admin/scoring-rules/{id} */
  public async updateScoringRule(ruleId: string, ruleData: any): Promise<any> {
    return this.request<any>(`/admin/scoring-rules/${ruleId}`, {
      method: 'PUT',
      body: JSON.stringify(ruleData),
    });
  }
}

export const apiService = new ApiService();
