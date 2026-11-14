const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api").replace(
  /\/$/,
  ""
);

export type TrackStep = {
  key: string;
  label: string;
  done: boolean;
  current: boolean;
};

export type TrackCompany = {
  id: number;
  name: string;
  img: string | null;
  purchased_at: string | null;
  is_executed: boolean;
};

export type TrackOffer = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  type_id: number | null;
  city: string | null;
  ort: string | null;
  adresse: string | null;
  zipcode: string | null;
  date: string | null;
  lang: string | null;
  confirm_status: string;
  confirmed_at: string | null;
  status: boolean;
  completion_status: string | null;
  created_at: string | null;
  companies_count: number;
  can_confirm: boolean;
};

export type TrackPayload = {
  offer: TrackOffer;
  steps: TrackStep[];
  companies: TrackCompany[];
  track_token: string;
};

type ApiEnvelope<T> = {
  status: number | string;
  msg?: string;
  data?: T;
  errors?: unknown;
};

const AUTH_STORAGE_KEY = "ak_customer_auth_token";

export function getStoredAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_STORAGE_KEY);
}

export function setStoredAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (!token) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(AUTH_STORAGE_KEY, token);
}

async function request<T>(
  path: string,
  init?: RequestInit,
  lang?: string,
  authToken?: string | null
): Promise<T> {
  const url = new URL(`${API_BASE}${path}`);
  if (lang) url.searchParams.set("lang", lang);

  const bearer = authToken === undefined ? getStoredAuthToken() : authToken;

  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(lang ? { "Accept-Language": lang } : {}),
      ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  let json: ApiEnvelope<T> | null = null;
  try {
    json = (await res.json()) as ApiEnvelope<T>;
  } catch {
    throw new Error("Invalid server response");
  }

  const ok =
    res.ok &&
    (json.status === 200 ||
      json.status === 201 ||
      json.status === "200" ||
      json.status === "success");

  if (!ok) {
    const data = (json.data || {}) as Record<string, unknown>;
    const err = new Error(json.msg || `Error ${res.status}`) as Error & {
      status?: number;
      code?: string;
      loginUrl?: string;
    };
    err.status = typeof json.status === "number" ? json.status : res.status;
    if (typeof data.code === "string") err.code = data.code;
    if (typeof data.login_url === "string") err.loginUrl = data.login_url;
    throw err;
  }

  return json.data as T;
}

export type Branding = {
  name: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  logo: string | null;
  logo_dark: string | null;
};

export async function getBranding(): Promise<Branding> {
  try {
    return await request<Branding>("/user/branding");
  } catch {
    return {
      name: "AuftragKompass",
      website: "https://auftragkompass.de",
      email: null,
      phone: null,
      logo: null,
      logo_dark: null,
    };
  }
}

export type MyOfferRow = {
  id: number;
  name: string | null;
  email: string | null;
  service: string | null;
  confirm_status: string | null;
  created_at: string | null;
  track_token: string;
  track_url: string;
};

export type MyOffersPayload = {
  offers: MyOfferRow[];
  latest_track_url: string | null;
  latest_track_token: string | null;
  total: number;
};

export function getMyOffers(authToken: string, lang?: string) {
  return request<MyOffersPayload>(
    "/user/auth/my-offers",
    undefined,
    lang,
    authToken
  );
}

export function getTracking(token: string, lang?: string) {
  return request<TrackPayload>(
    `/user/offer-track/${encodeURIComponent(token)}`,
    undefined,
    lang
  );
}

export function confirmTracking(token: string, lang?: string) {
  return request<{ track_token: string; offer_id: number }>(
    `/user/offer-track/${encodeURIComponent(token)}/confirm`,
    { method: "POST" },
    lang
  );
}

export function markExecuted(
  token: string,
  body: { company_id?: number | null; is_executed: boolean },
  lang?: string
) {
  return request(
    `/user/offer-track/${encodeURIComponent(token)}/executed`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    lang
  );
}

export function rateCompany(
  token: string,
  body: {
    stars: number;
    comment?: string;
    user_id: number;
  },
  lang?: string
) {
  return request(
    `/user/offer-track/${encodeURIComponent(token)}/rate`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    lang
  );
}

export function sendAnnouncement(token: string, comment: string, lang?: string) {
  return request(
    `/user/offer-track/${encodeURIComponent(token)}/announce`,
    {
      method: "POST",
      body: JSON.stringify({ comment }),
    },
    lang
  );
}

export type ChatMessage = {
  id: number;
  sender_type: "customer" | "company" | "admin";
  sender_id: number | null;
  body: string;
  read_at: string | null;
  created_at: string | null;
};

export type ChatConversationSummary = {
  conversation_id: number | null;
  company: { id: number; name: string; img: string | null };
  last_message: {
    id: number;
    body: string;
    sender_type: string;
    created_at: string | null;
  } | null;
  unread_count: number;
  last_message_at: string | null;
};

export function listChats(token: string, lang?: string) {
  return request<{ conversations: ChatConversationSummary[] }>(
    `/user/offer-track/${encodeURIComponent(token)}/chats`,
    undefined,
    lang
  );
}

export function getChat(token: string, companyId: number, afterId = 0, lang?: string) {
  return request<{
    conversation_id: number;
    company_id: number;
    messages: ChatMessage[];
  }>(
    `/user/offer-track/${encodeURIComponent(token)}/chats/${companyId}${
      afterId > 0 ? `?after_id=${afterId}` : ""
    }`,
    undefined,
    lang
  );
}

export function sendChat(
  token: string,
  companyId: number,
  body: string,
  lang?: string
) {
  return request<ChatMessage>(
    `/user/offer-track/${encodeURIComponent(token)}/chats/${companyId}`,
    {
      method: "POST",
      body: JSON.stringify({ body }),
    },
    lang
  );
}
