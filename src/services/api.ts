/**
 * SDG Sorting Hat API Service Client
 * Handles communication with the FastAPI Backend (http://localhost:8000/api)
 * Supports token storage, health checks, public endpoints, and authenticated admin calls.
 */

const DEFAULT_API_BASE_URL = 'http://localhost:8000/api';

export interface HealthCheckResponse {
  status: string;
  service?: string;
  scoring_version?: string;
  database?: string;
}

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

class ApiService {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = localStorage.getItem('sdg_api_base_url') || DEFAULT_API_BASE_URL;
    this.token = localStorage.getItem('sdg_admin_token') || null;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public setBaseUrl(url: string): void {
    let cleanUrl = url.trim().replace(/\/+$/, '');
    if (!cleanUrl.endsWith('/api') && !cleanUrl.includes('/api/')) {
      cleanUrl = `${cleanUrl}/api`;
    }
    this.baseUrl = cleanUrl;
    localStorage.setItem('sdg_api_base_url', cleanUrl);
  }

  public getToken(): string | null {
    return this.token;
  }

  public setToken(token: string | null): void {
    this.token = token;
    if (token) {
      localStorage.setItem('sdg_admin_token', token);
    } else {
      localStorage.removeItem('sdg_admin_token');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `API Error ${response.status}: ${response.statusText}`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail) {
          errorMessage = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
        }
      } catch {
        // use default error message
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // ──────────────────────────────────────────
  // PUBLIC ENDPOINTS
  // ──────────────────────────────────────────

  /** Health check */
  public async checkHealth(): Promise<HealthCheckResponse> {
    const rootHealthUrl = this.baseUrl.replace(/\/api$/, '') + '/health';
    try {
      const res = await fetch(rootHealthUrl, { signal: AbortSignal.timeout(3000) });
      if (res.ok) return res.json();
    } catch {
      // try /api/health fallback
    }
    return this.request<HealthCheckResponse>('/health');
  }

  /** Get active questionnaire questions */
  public async getQuestions(): Promise<any[]> {
    return this.request<any[]>('/questions');
  }

  /** Register a participant session */
  public async registerParticipant(data: { fullName: string; email: string; studyYear: string }) {
    return this.request<any>('/participants', {
      method: 'POST',
      body: JSON.stringify({
        full_name: data.fullName,
        email: data.email,
        academic_year: data.studyYear,
      }),
    });
  }

  /** Submit sorting responses */
  public async submitSorting(participantId: string, responses: { question_id: string; answer_id: string }[]) {
    return this.request<any>('/sort', {
      method: 'POST',
      body: JSON.stringify({
        participant_id: participantId,
        responses,
      }),
    });
  }

  // ──────────────────────────────────────────
  // ADMIN AUTHENTICATION
  // ──────────────────────────────────────────

  /** Admin Login */
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

  /** Admin Logout */
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

  /** Get current authenticated admin profile */
  public async getAdminMe(): Promise<any> {
    return this.request<any>('/admin/me');
  }

  // ──────────────────────────────────────────
  // ADMIN MANAGEMENT API VIEWS
  // ──────────────────────────────────────────

  /** Get Admin Statistics */
  public async getAdminStatistics(): Promise<BackendAdminStats> {
    return this.request<BackendAdminStats>('/admin/statistics');
  }

  /** Get Admin Participants */
  public async getAdminParticipants(limit = 50, skip = 0, statusFilter?: string): Promise<any[]> {
    let url = `/admin/participants?limit=${limit}&skip=${skip}`;
    if (statusFilter) url += `&status=${statusFilter}`;
    return this.request<any[]>(url);
  }

  /** Get Admin Sorting Results */
  public async getAdminResults(limit = 50, skip = 0): Promise<any[]> {
    return this.request<any[]>(`/admin/results?limit=${limit}&skip=${skip}`);
  }

  /** Admin List Departments */
  public async getAdminDepartments(): Promise<any[]> {
    return this.request<any[]>('/admin/departments');
  }

  /** Admin Create Department */
  public async createDepartment(deptData: any): Promise<any> {
    return this.request<any>('/admin/departments', {
      method: 'POST',
      body: JSON.stringify(deptData),
    });
  }

  /** Admin Update Department */
  public async updateDepartment(deptId: string, deptData: any): Promise<any> {
    return this.request<any>(`/admin/departments/${deptId}`, {
      method: 'PUT',
      body: JSON.stringify(deptData),
    });
  }

  /** Admin List Questions */
  public async getAdminQuestions(): Promise<any[]> {
    return this.request<any[]>('/admin/questions');
  }

  /** Admin Create Question */
  public async createQuestion(qData: any): Promise<any> {
    return this.request<any>('/admin/questions', {
      method: 'POST',
      body: JSON.stringify(qData),
    });
  }

  /** Admin Update Question */
  public async updateQuestion(questionId: string, qData: any): Promise<any> {
    return this.request<any>(`/admin/questions/${questionId}`, {
      method: 'PUT',
      body: JSON.stringify(qData),
    });
  }

  /** Admin Create Answer */
  public async createAnswer(ansData: any): Promise<any> {
    return this.request<any>('/admin/answers', {
      method: 'POST',
      body: JSON.stringify(ansData),
    });
  }

  /** Admin Update Answer */
  public async updateAnswer(answerId: string, ansData: any): Promise<any> {
    return this.request<any>(`/admin/answers/${answerId}`, {
      method: 'PUT',
      body: JSON.stringify(ansData),
    });
  }

  /** Admin List Scoring Rules */
  public async getAdminScoringRules(): Promise<any[]> {
    return this.request<any[]>('/admin/scoring-rules');
  }

  /** Admin Create Scoring Rule */
  public async createScoringRule(ruleData: any): Promise<any> {
    return this.request<any>('/admin/scoring-rules', {
      method: 'POST',
      body: JSON.stringify(ruleData),
    });
  }

  /** Admin Update Scoring Rule */
  public async updateScoringRule(ruleId: string, ruleData: any): Promise<any> {
    return this.request<any>(`/admin/scoring-rules/${ruleId}`, {
      method: 'PUT',
      body: JSON.stringify(ruleData),
    });
  }
}

export const apiService = new ApiService();
