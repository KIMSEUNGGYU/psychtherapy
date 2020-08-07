import React, { useState, useEffect } from "react";
import "./Pagination.scss";
import {
    MdArrowDropDown,
    MdMoreHoriz,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight
} from "react-icons/md";

// [TODO]
const Pagination = (props) => {
    const { total, queryData, setQueryData } = props;
    const limit = Number(queryData.limit);
    const offset = Number(queryData.offset);
    const page = offset === 0 ? 1 : offset / limit + 1;
    const [pageInputValue, setPageInputValue] = useState("");
    const totalPages = Math.ceil(total / limit);

    const gotoPage = (_page) => {
        if (!_page) {
            return;
        }
        const _offest = limit * Number(_page - 1);
        setQueryData({
            ...queryData,
            offset: _offest.toString()
        });
    };

    const onClickLimit = (_limit) => {
        setQueryData({ ...queryData, limit: _limit, offset: 0 });
    };

    const onClickPage = (_page) => {
        gotoPage(_page);
    };

    const onClickPrev = (step) => {
        gotoPage(page - step);
    };

    const onClickNext = (step) => {
        gotoPage(page + step);
    };

    const onKeyDown = (e) => {
        if (
            !pageInputValue
            || e.keyCode !== 13
            || totalPages < Number(pageInputValue)
        ) {
            return;
        }
        gotoPage(pageInputValue);
        setPageInputValue("");
    };

    const range = (from, to, step = 1) => {
        let i = from;
        const _range = [];
        while (i <= to) {
            _range.push(i);
            i += step;
        }
        return _range;
    };

    const makePageNumbers = () => {
        const totalNumbers = 9;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, page - 4);
            const endPage = Math.min(totalPages - 1, page + 4);

            let pages = range(startPage, endPage);

            const prevSpill = startPage > 2;
            const nextSpill = totalPages - endPage > 1;
            const spillOffset = totalNumbers - (pages.length + 1);
            if (prevSpill && !nextSpill) {
                const extraPages = range(
                    startPage - spillOffset,
                    startPage - 1
                );
                pages = ["prev", ...extraPages, ...pages];
            } else if (!prevSpill && nextSpill) {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, "next"];
            } else if (!prevSpill && nextSpill) {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, "next"];
            } else {
                pages = ["prev", ...pages, "next"];
            }
            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };

    const pages = makePageNumbers();

    return (
        <div className="pagination-box">
            <div className="page-limit-box">
                <span className="label">Per Page</span>
                <div className="dropdown-box">
                    <p className="current">
                        {limit}
                        <MdArrowDropDown />
                    </p>
                    <ul>
                        {[10, 25, 50].map((el, key) => {
                            return (
                                <li
                                    key={key}
                                    className="dropdown-item"
                                    onClick={() => { return onClickLimit(el); }}
                                >
                                    {el}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="pagination">
                <ul>
                    <li className="dir-item">
                        <button
                            className="prev-btn"
                            onClick={() => { return onClickPrev(1); }}
                            disabled={page === 1}
                        >
                            <MdKeyboardArrowLeft />
                        </button>
                    </li>
                    <div className="page-items">
                        <ul>
                            {pages.map((el, key) => {
                                if (el === "prev") {
                                    return (
                                        <li
                                            key={key}
                                            className="page-item"
                                            onClick={() => { return onClickPrev(9); }}
                                        >
                                            <MdMoreHoriz />
                                        </li>
                                    );
                                } if (el === "next") {
                                    return (
                                        <li
                                            key={key}
                                            className="page-item"
                                            onClick={() => { return onClickNext(9); }}
                                        >
                                            <MdMoreHoriz />
                                        </li>
                                    );
                                }
                                return (
                                    <li
                                        key={key}
                                        className={`page-item${
                                            page === el ? " active" : ""
                                        }`}
                                        onClick={() => { return onClickPage(el); }}
                                    >
                                        {el}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <li className="dir-item">
                        <button
                            onClick={() => { return onClickNext(1); }}
                            disabled={
                                page === totalPages || Number(total) === 0
                            }
                        >
                            <MdKeyboardArrowRight />
                        </button>
                    </li>
                </ul>
            </div>
            <div className="goto-box">
                <span className="label">Go To Page</span>
                <input
                    type="number"
                    className="goto-input"
                    value={pageInputValue}
                    onChange={(e) => { return setPageInputValue(e.target.value); }}
                    onKeyDown={onKeyDown}
                />
                <button
                    className="goto-btn"
                    onClick={() => { return gotoPage(pageInputValue); }}
                    disabled={
                        !pageInputValue || totalPages < Number(pageInputValue)
                    }
                >
                    Go
                </button>
            </div>
        </div>
    );
};

export default Pagination;
