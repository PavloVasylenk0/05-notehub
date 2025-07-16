import { useFormik } from "formik";
import * as Yup from "yup";
import { createNote } from "../../services/noteService";
import { useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const formik = useFormik<NoteFormValues>({
    initialValues: {
      title: "",
      content: "",
      tag: "Todo",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).max(50).required("Required"),
      content: Yup.string().max(500),
      tag: Yup.string()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
        .required("Required"),
    }),
    onSubmit: async (values) => {
      await createNote(values);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <span className={css.error}>{formik.errors.title}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={formik.values.content}
          onChange={formik.handleChange}
        />
        <span className={css.error}>{formik.errors.content}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={formik.values.tag}
          onChange={formik.handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error}>{formik.errors.tag}</span>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
