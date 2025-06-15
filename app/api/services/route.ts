// services/pollService.ts
import { Poll } from "@/types/poll";

const BASE = "/api";

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
}

export interface NewPoll {
  title: string;
  description?: string;
  start_date: string;    // ISO date
  end_date: string;      // ISO date
  is_active: boolean;
  target_occupation?: string | null;
  target_location?: string | null;
  birthdate_min?: string | null;
  birthdate_max?: string | null;
  target_gender?: string | null;
}

export interface UserSummary {
  id: string;
  fullName: string;
  email: string;
  occupation?: string;
  location?: string;
  gender?: string;
}

const pollService = {
  // Ψηφοφορίες
  getPolls(): Promise<Poll[]> {
    return request<Poll[]>(`${BASE}/elections`);
  },

  getPoll(id: string): Promise<Poll> {
    return request<Poll>(`${BASE}/elections/${id}`);
  },

  createPoll(data: NewPoll): Promise<Poll> {
    return request<Poll>(`${BASE}/elections`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updatePoll(id: string, data: Partial<NewPoll>): Promise<Poll> {
    return request<Poll>(`${BASE}/elections/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deletePoll(id: string): Promise<void> {
    return request<void>(`${BASE}/elections/${id}`, {
      method: "DELETE",
    });
  },

  // Users (για το dialog «Προσθήκη Υποψηφίου»)
  getUsers(search = ""): Promise<UserSummary[]> {
    const qs = search
      ? `?search=${encodeURIComponent(search)}`
      : "";
    return request<UserSummary[]>(`${BASE}/users${qs}`);
  },
};

export default pollService;
