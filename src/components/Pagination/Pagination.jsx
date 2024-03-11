import React, { useEffect, useState } from "react";
import "./Pagination.scss";
import { Link } from "react-router-dom";

const Pagination = ({ count }) => {
  const params = new URLSearchParams(location.search);
  const [page, setpage] = useState(1);
  const [blogPerPage, setBlogPerPage] = useState(6);
  const queryParams = {};

  for (const [key, value] of params.entries()) {
    if (!isNaN(value)) {
      queryParams[key] = Number(value);
    } else {
      queryParams[key] = value;
    }
  }

  function setterPage() {
    setpage(queryParams.skip ? queryParams.skip / blogPerPage + 1 : 1);
  }
  useEffect(() => {
    setterPage();
  }, [queryParams]);

  return (
    <div className="pagination">
      <Link
        className={
          queryParams.skip === 0 || !queryParams.skip
            ? "disabled-link displayNone"
            : "displayShow"
        }
        to={
          queryParams.cat
            ? `/?cat=${queryParams.cat}&skip=${
                queryParams.skip - blogPerPage || 0
              }&limit=${queryParams.limit - blogPerPage || blogPerPage}`
            : queryParams.username
            ? `/?username=${queryParams.username}&skip=${
                queryParams.skip - blogPerPage || 0
              }&limit=${queryParams.limit - blogPerPage || blogPerPage}`
            : `/?skip=${queryParams.skip - blogPerPage || 0}&limit=${
                queryParams.limit - blogPerPage || blogPerPage
              }`
        }
      >
        <button>◀</button>
      </Link>
      {Array(Math.ceil(count / blogPerPage))
        .fill(0)
        .map((i, ind) => (
          <span className={page - 1 === ind ? "red" : undefined} key={ind}>
            <Link
              to={
                queryParams.cat
                  ? `/?cat=${queryParams.cat}&skip=${
                      ind * blogPerPage
                    }&limit=${blogPerPage}`
                  : queryParams.username
                  ? `/?username=${queryParams.username}&skip=${
                      ind * blogPerPage
                    }&limit=${blogPerPage}`
                  : `/?skip=${ind * blogPerPage}&limit=${blogPerPage}`
              }
            >
              {ind + 1}
            </Link>
          </span>
        ))}

      <Link
        className={
          queryParams.limit ===
            ("NaN" && Math.ceil(count / blogPerPage) <= 1) ||
          Math.ceil(count / blogPerPage) === page ||
          count === 0
            ? "disabled-link displayNone"
            : "displayShow"
        }
        to={
          queryParams.cat
            ? `/?cat=${queryParams.cat}&skip=${
                queryParams.skip + blogPerPage || blogPerPage
              }&limit=${blogPerPage}`
            : queryParams.username
            ? `/?username=${queryParams.username}&skip=${
                queryParams.skip + blogPerPage || blogPerPage
              }&limit=${blogPerPage}`
            : `/?skip=${
                queryParams.skip + blogPerPage || blogPerPage
              }&limit=${blogPerPage}`
        }
        onClick={() => setterPage}
      >
        <button>▶</button>
      </Link>
    </div>
  );
};

export default Pagination;
