import { Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MyPagination = ({ total, current }) => {
  const router = useRouter();
  // console.log(router.pathname)
  const [keywordParamSearch, setKeywordParamSearch] = useState(router.query.keyword);
  // const [sortbyParamSearch, setSortbyParamSearch] = useState(router.query.sortby);
  const [sortParamSearchSearch, setsortParamSearchSearch] = useState(router.query.sort);
  // const [pageParamSearch, setPageParamSearch] = useState(router.query.page);
  const [limitParamSearch, setLimitParamSearch] = useState(router.query.limit);

  useEffect(() => {
    setKeywordParamSearch(router.query.keyword);
    // setSortbyParamSearch(router.query.sortby || "created_on");
    setsortParamSearchSearch(router.query.sort || "desc");
    // setPageParamSearch(router.query.page || "1");
    setLimitParamSearch(router.query.limit || "12");
  }, [router]);

  let items = [];

  if (total  >1) {
    // first item
    if (current >= 4) {
      items.push(
        <Pagination.Item
          key="first"
          onClick={() => {
            if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
              router.push({
                pathname: `${router.pathname}`,
                query: {
                  sort: sortParamSearchSearch,
                  page: 1,
                  limit: limitParamSearch,
                },
              });
            } else {
              router.push({
                pathname: `${router.pathname}`,
                query: {
                  keyword: keywordParamSearch,
                  sort: sortParamSearchSearch,
                  page: 1,
                  limit: limitParamSearch,
                },
              });
            }
          }}
        >
          {" "}
          {1}
        </Pagination.Item>
      );
    }
    // prev
    if (current > 1) {
      items.push(
        <Pagination.Prev
          key="prev"
          onClick={() => {
            if (keywordParamSearch == undefined || keywordParamSearch == "" || (keywordParamSearch == null) === null) {
              router.push({
                pathname: `${router.pathname}`,
                query: {
                  sort: sortParamSearchSearch,
                  page: current - 1,
                  limit: limitParamSearch,
                },
              });
            } else {
              router.push({
                pathname: `${router.pathname}`,
                query: {
                  keyword: keywordParamSearch,
                  sort: sortParamSearchSearch,
                  page: current - 1,
                  limit: limitParamSearch,
                },
              });
            }
          }}
        />
      );
    }

    // Ellipsis first
    if (current > 4) {
      items.push(<Pagination.Ellipsis key={"ellipsisFirst"} disabled />);
    }

    // Item Page
    if (total < 6 && total >= 1) {
      for (let page = 1; page <= total; page++) {
        items.push(
          <Pagination.Item
            key={page}
            data-page={page}
            value={page}
            active={page === current}
            onClick={() => {
              if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
                router.push({
                  pathname: `${router.pathname}`,
                  query: {
                    sort: sortParamSearchSearch,
                    page: page,
                    limit: limitParamSearch,
                  },
                });
              } else {
                router.push({
                  pathname: `${router.pathname}`,
                  query: {
                    keyword: keywordParamSearch,
                    sort: sortParamSearchSearch,
                    page: page,
                    limit: limitParamSearch,
                  },
                });
              }
            }}
          >
            {page}
          </Pagination.Item>
        );
      }
    }
    if (total > 6 && current < 4) {
      for (let page = 1; page <= 6; page++) {
        items.push(
          <Pagination.Item
            key={page}
            data-page={page}
            value={page}
            active={page === current}
            onClick={() => {
              if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
                router.push({
                  pathname: `${router.pathname}`,
                  query: {
                    sort: sortParamSearchSearch,
                    page: page,
                    limit: limitParamSearch,
                  },
                });
              } else {
                router.push({
                  pathname: `${router.pathname}`,
                  query: {
                    keyword: keywordParamSearch,
                    sort: sortParamSearchSearch,
                    page: page,
                    limit: limitParamSearch,
                  },
                });
              }
            }}
          >
            {page}
          </Pagination.Item>
        );
      }
    }
    if (total > 6 && current >= 4 && current <= total - 4) {
      for (let page = current - 2; page <= total; page++) {
        items.push(
          <Pagination.Item
            key={page}
            data-page={page}
            value={page}
            active={page === current}
            onClick={() => {
              if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
                router.push({
                  pathname: `${router.pathname}`,
                  query: {
                    sort: sortParamSearchSearch,
                    page: page,
                    limit: limitParamSearch,
                  },
                });
              } else {
                router.push({
                  pathname: `${router.pathname}`,
                  query: {
                    keyword: keywordParamSearch,
                    sort: sortParamSearchSearch,
                    page: page,
                    limit: limitParamSearch,
                  },
                });
              }
            }}
          >
            {page}
          </Pagination.Item>
        );
        if (page === current + 2) break;
      }
    }
    if (total > 6 && current > total - 4) {
      for (let page = current - 2; page <= total; page++) {
        items.push(
          <Pagination.Item
            key={page}
            data-page={page}
            value={page}
            active={page === current}
            onClick={() => {
              if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
                router.push({
                  pathname: `${router.pathname}`,
                  query: {
                    sort: sortParamSearchSearch,
                    page: page,
                    limit: limitParamSearch,
                  },
                });
              } else {
                router.push({
                  pathname: `${router.pathname}`,
                  query: {
                    keyword: keywordParamSearch,
                    sort: sortParamSearchSearch,
                    page: page,
                    limit: limitParamSearch,
                  },
                });
              }
            }}
          >
            {page}
          </Pagination.Item>
        );
      }
    }

    // Ellipsis Last
    if (current < total - 6) {
      items.push(<Pagination.Ellipsis key={"ellipsisLast"} disabled />);
    }

    // Next Page
    if (current < total) {
      items.push(
        <Pagination.Next
          key="next"
          onClick={() => {
            if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
              router.push({
                pathname: `${router.pathname}`,
                query: {
                  sort: sortParamSearchSearch,
                  page: current + 1,
                  limit: limitParamSearch,
                },
              });
            } else {
              router.push({
                pathname: `${router.pathname}`,
                query: {
                  keyword: keywordParamSearch,
                  sort: sortParamSearchSearch,
                  page: current + 1,
                  limit: limitParamSearch,
                },
              });
            }
          }}
        />
      );
    }

    // Last Page
    if (current <= total - 6) {
      items.push(
        <Pagination.Item
          key="last"
          onClick={() => {
            if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
              router.push({
                pathname: `${router.pathname}`,
                query: {
                  sort: sortParamSearchSearch,
                  page: total,
                  limit: limitParamSearch,
                },
              });
            } else {
              router.push({
                pathname: `${router.pathname}`,
                query: {
                  keyword: keywordParamSearch,
                  sort: sortParamSearchSearch,
                  page: total,
                  limit: limitParamSearch,
                },
              });
            }
          }}
        >
          {total}
        </Pagination.Item>
      );
    }
  }
  return <Pagination className={` ${total != 0 ? "mt-5" : ""}`}>{items}</Pagination>;
};

export default MyPagination;
