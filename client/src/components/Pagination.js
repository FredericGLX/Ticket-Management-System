import '../scss/components/pagination.scss';
import { GrFormNextLink } from 'react-icons/gr';
import { GrFormPreviousLink } from 'react-icons/gr';

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
          <span onClick={handlePrevious}>
            <GrFormPreviousLink className="page-icon" size={'1.6rem'} />
          </span>
          {currentPage - 1}
        </div>
      ) : (
        ''
      )}
      <div className="currentPage">{currentPage}</div>
      {currentPage < totalPages ? (
        <div className="next-part">
          {currentPage + 1}
          <span onClick={handleNext}>
            <GrFormNextLink className="page-icon" size={'1.6rem'} />
          </span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Pagination;
