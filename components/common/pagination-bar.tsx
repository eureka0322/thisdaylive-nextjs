import ReactPaginate from 'react-paginate';

interface Props {
    currentPage: number,
    totalPageCount: number,
    handlePagination: (page: number) => void
}

export default function PaginationBar({currentPage, totalPageCount, handlePagination}: Props) {
    const handlePageClick = (selectedItem: {selected: number}) => {
      handlePagination(selectedItem.selected + 1);
    };
    return (
        <div>
            <ReactPaginate className="pagination-bar"
                forcePage={currentPage}
                pageCount={totalPageCount}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                breakLabel="..."
                nextLabel="Next »"
                previousLabel="« Previous"
                activeClassName ="active"
            />
        </div>
        
    )
}