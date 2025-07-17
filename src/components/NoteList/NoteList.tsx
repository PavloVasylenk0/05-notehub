import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { deleteNote } from "../../services/noteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteNoteMutate, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Failed to delete note:", error);
    },
  });

  const handleDelete = (id: string) => {
    deleteNoteMutate(id);
  };

  if (!notes?.length) return null;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id.toString ())}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
