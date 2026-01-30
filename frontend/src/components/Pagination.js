import React from "react";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  if (currentPage === 1) {
    return (
      <nav className="my-1">
        <ul className="pagination ml-5 pl-5">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link"
              href="#"
              title="Next"
            >
              Next &rarr;
            </button>
          </li>
        </ul>
      </nav>
    );
  } else if (currentPage === lastPage) {
    return (
      <nav className="my-1">
        <ul className="pagination">
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link"
              href="#"
              title="Previous"
            >
              &larr; Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="my-1">
        <ul className="pagination">
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link"
              href="#"
              title="Previous"
            >
              &larr; Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link"
              href="#"
              title="Next"
            >
              Next &rarr;
            </button>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Pagination;
