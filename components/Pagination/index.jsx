import { Pagination } from "react-bootstrap";

// import { useSearchParams } from "react-router-dom";

import { useRouter } from "next/router";

export default function MyPagination({ total, current }) {
  const router = useRouter();

  // const [searchParams, setSearchParams] = useSearchParams();

  let keywordParam = router.query.keyword;

  let sortParam = router.query.sort || "desc";
  let limitParam = router.query.limit || "24";

  // console.log(current)

  let items = [];
  if (current > 1) {
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => {
          if (keywordParam === null) {
            // setSearchParams({
            //     sort: sortParam,
            //     page: (current - 1),
            //     limit: limitParam,
            // });

            router.push({
              pathname: `/job`,
              query: {
                sort: sortParam,
                page: current - 1,
                limit: limitParam,
              },
            });
          } else {
            // setSearchParams({
            //     keyword: keywordParam,
            //     sort: sortParam,
            //     page: (current - 1),
            //     limit: limitParam,
            // });
            router.push({
              pathname: `/job`,
              query: {
                keyword: keywordParam,
                sort: sortParam,
                page: current - 1,
                limit: limitParam,
              },
            });
          }
        }}
      />
    );
  }

  for (let page = 1; page <= total; page++) {
    items.push(
      <Pagination.Item
        key={page}
        data-page={page}
        value={page}
        active={page === current}
        onClick={() => {
          if (keywordParam === null) {
            // setSearchParams({
            //     sort: sortParam,
            //     page: page,
            //     limit: limitParam,
            // });
            router.push({
              pathname: `/job`,
              query: {
                sort: sortParam,
                page: page,
                limit: limitParam,
              },
            });
          } else {
            // setSearchParams({
            //     keyword: keywordParam,
            //     sort: sortParam,
            //     page: page,
            //     limit: limitParam,
            // });
            router.push({
              pathname: `/job`,
              query: {
                keyword: keywordParam,
                sort: sortParam,
                page: page,
                limit: limitParam,
              },
            });
          }
        }}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (current < total) {
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => {
          if (keywordParam === null) {
            // setSearchParams({
            //     sort: sortParam,
            //     page: (current + 1),
            //     limit: limitParam,
            // });
            router.push({
              pathname: `/job`,
              query: {
                sort: sortParam,
                page: current + 1,
                limit: limitParam,
              },
            });
          } else {
            // setSearchParams({
            //     keyword: keywordParam,
            //     sort: sortParam,
            //     page: (current + 1),
            //     limit: limitParam,
            // });
            router.push({
              pathname: `/job`,
              query: {
                keyword: keywordParam,
                sort: sortParam,
                page: current + 1,
                limit: limitParam,
              },
            });
          }
        }}
      />
    );
  }

  return <Pagination>{items}</Pagination>;
}
