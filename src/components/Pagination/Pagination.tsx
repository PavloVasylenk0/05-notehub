import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
