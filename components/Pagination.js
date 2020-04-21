import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 10
}

const Pagination = (props) => {
    const [pager, setPager] = useState({})

    const setPage = function (page) {
        var { items, pageSize } = props;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        const newPager = getPager(items.length, page, pageSize);
        var pageOfItems = items.slice(newPager.startIndex, newPager.endIndex + 1);

        setPager(newPager );

        props.onChangePage(pageOfItems);
    }

    const getPager = function (totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;

        pageSize = pageSize || 10;

        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    useEffect(()=>{
        setPage(props.initialPage)
    },[props.items, props.initialPage])

        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a onClick={() => setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
        );
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
