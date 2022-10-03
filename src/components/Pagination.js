function Pagination({ pages, currentPage, setCurrentPage }) {
  return (
    <ul className="inline-flex -space-x-px">
      {pages.map((page, i) => (
        <li key={page} onClick={() => setCurrentPage(page)}>
          <a href="#" className={currentPage == page ? 'paginationNormal' : 'paginationActive'}>
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
