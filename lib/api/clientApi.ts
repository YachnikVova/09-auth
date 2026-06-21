import { api } from './api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

// ---------- Notes ----------

export interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  search,
  page,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search ? { search } : {}),
      page,
      perPage: 12,
      ...(tag && tag !== 'All' ? { tag } : {}),
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const res = await api.post<Note>('/notes', payload);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

// ---------- Auth ----------

export interface AuthRequest {
  email: string;
  password: string;
}

export const register = async (payload: AuthRequest): Promise<User> => {
  const res = await api.post<User>('/auth/register', payload);
  return res.data;
};

export const login = async (payload: AuthRequest): Promise<User> => {
  const res = await api.post<User>('/auth/login', payload);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

interface CheckSessionResponse {
  success: boolean;
}

export const checkSession = async (): Promise<boolean> => {
  const res = await api.get<CheckSessionResponse>('/auth/session');
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

export interface UpdateMePayload {
  username: string;
}

export const updateMe = async (payload: UpdateMePayload): Promise<User> => {
  const res = await api.patch<User>('/users/me', payload);
  return res.data;
};
