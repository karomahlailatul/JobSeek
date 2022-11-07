import { Pagination } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

const MyPagination = ({ setPage, currentPage, totalPage }) => {
  // const router = useRouter();

  let items = [];

  // console.log(totalPage)

  if (totalPage > 1) {
    // first item
    if (currentPage >= 4) {
      items.push(
        <Pagination.Item
          key="first"
          onClick={() => {
            setPage(1);
          }}
        >
          {1}
        </Pagination.Item>
      );
    }
    // prev
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

    // Ellipsis first
    if (currentPage > 4) {
      items.push(<Pagination.Ellipsis key={"ellipsisFirst"} disabled />);
    }

    // Item page
    // if item under 6 page
    if (totalPage <= 6 && currentPage >= 1) {
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
    }
    // if page more than 6 page, position current-6
    if (totalPage > 6 && currentPage < 4) {
      for (let page = 1; page <= 6; page++) {
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
    }
    // if page more than 6 page, position current+6 and totalpage-6
    if (totalPage > 6 && currentPage >= 4 && currentPage <= totalPage - 4) {
      for (let page = currentPage - 2; page <= totalPage; page++) {
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
        if (page === currentPage + 2) break;
      }
    }
    // if page more than 6 page, position current+6 and between totalpages-6
    if (totalPage > 6 && currentPage > totalPage - 4) {
      for (let page = currentPage - 2; page <= totalPage; page++) {
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
    }

    // Ellipsis Last
    if (currentPage < totalPage - 6) {
      items.push(<Pagination.Ellipsis key={"ellipsisLast"} disabled />);
    }

    // Next Page
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

    // Last Page
    if (currentPage <= totalPage - 6) {
      items.push(
        <Pagination.Item
          key="last"
          onClick={() => {
            setPage(totalPage);
          }}
        >
          {totalPage}
        </Pagination.Item>
      );
    }

    // console.log(items)
  }

  return <Pagination>{items}</Pagination>;
};

export default MyPagination;
