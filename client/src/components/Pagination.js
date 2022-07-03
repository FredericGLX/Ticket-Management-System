import '../scss/components/pagination.scss';

const Pagination = ({
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
}) => {
  currentPage = currentPage + 1;
  return (
    <div className="pagination">
      {currentPage > 1 ? (
        <div className="previous-part">
          <button onClick={handlePrevious}>Prev</button>
          {currentPage - 1}
        </div>
      ) : (
        ''
      )}
      <div className="currentPage">{currentPage}</div>
      {currentPage < totalPages ? (
        <div className="next-part">
          {currentPage + 1}
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Pagination;
