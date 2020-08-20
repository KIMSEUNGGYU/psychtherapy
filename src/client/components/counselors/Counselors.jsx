import React, { useState, useEffect } from "react";
import "./Counselors.scss";
import queryString from "query-string";
import { MdZoomIn } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa";
import { Filter, Pagination } from "client/components";
import doc1 from "client/images/doc1.jpg";
import doc2 from "client/images/doc2.jpg";
import doc3 from "client/images/doc3.jpg";

const Counselors = (props) => {
    console.log(props);
    const [queryData, setQueryData] = useState(
        queryString.parse(props.location.search)
    );
    useEffect(() => {
        setQueryData(queryString.parse(props.location.search));
        props.getPartners({ ...queryData, evaluate: true });
    }, [props.location.search]);

    useEffect(() => {
        const query = queryString.stringify(queryData, {
            arrayFormat: "comma",
            skipEmptyString: true,
            skipNull: true
        });
        if (
            queryString.stringify(queryString.parse(props.location.search)) ===
            query
        ) {
            return;
        }
        props.history.push(`/partners?${query}`);
    }, [queryData]);

    const filterProps = {
        setQueryData,
        queryData
    };
    const paginationProps = {
        setQueryData,
        queryData,
        total: props.total
    };

    return (
        <div className="container counselors">
            <div className="layout  flex_box between">
                <Filter {...filterProps} />
                <div className="counselors_box">
                    <p className="count">검색결과 ({props.total}건)</p>
                    <ul className="flex_box between">
                        {props.partners.map((el, key) => {
                            return (
                                <li className="counselor" key={key}>
                                    <img src={doc1} alt="" />
                                    <div className="txt_box">
                                        <p className="level">
                                            {el.level === 1
                                                ? "마스터"
                                                : el.level === 2
                                                ? "전문"
                                                : "일반"}
                                        </p>
                                        <p className="name">{el.name}</p>
                                        <p className="certification">
                                            {el.certificate}급 상담사
                                        </p>
                                        <p className="info">{el.shortInfo}</p>
                                        <button
                                            className="more_btn"
                                            onClick={() =>
                                                props.history.push(
                                                    `${
                                                        props.location.pathname
                                                    }/${queryString.stringify(
                                                        queryData
                                                    )}/${el.id}`
                                                )
                                            }
                                        >
                                            자세히 보기
                                            <MdZoomIn />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <Pagination {...paginationProps} />
                </div>
            </div>
        </div>
    );
};

export default Counselors;
