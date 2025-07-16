import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 10,
  search = "",
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("perPage", perPage.toString());
  if (search) params.append("search", search);
  if (tag) params.append("tag", tag);

  const response = await instance.get("/notes", { params });
  return response.data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export const createNote = async (noteData: CreateNoteParams): Promise<Note> => {
  const response = await instance.post("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete(`/notes/${id}`);
  return response.data;
};
