import { Pagination } from "react-bootstrap";

const MyPaginationTable = ({ setPage, currentPage, totalPage }) => {
  let items = [];
  if (currentPage > 1) {
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => {
          setPage(currentPage - 1);
        }}
      />
    );
  }

  for (let page = 1; page <= totalPage; page++) {
    items.push(
      <Pagination.Item
        key={page}
        data-page={page}
        value={page}
        active={page === currentPage}
        onClick={() => {
          setPage(page);
        }}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (currentPage < totalPage) {
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => {
          setPage(currentPage + 1);
        }}
      />
    );
  }

  return <Pagination >{items}</Pagination>;
};

export default MyPaginationTable;
