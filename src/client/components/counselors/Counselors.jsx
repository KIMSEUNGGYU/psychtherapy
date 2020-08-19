import React, { useState, useEffect } from "react";
import "./Counselors.scss";
import queryString from "query-string";
import { history } from "client/store";
import { MdZoomIn } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa";
import { Filter, Pagination } from "client/components";
import doc1 from "client/images/doc1.jpg";
import doc2 from "client/images/doc2.jpg";
import doc3 from "client/images/doc3.jpg";

const Counselors = (props) => {
    const [queryData, setQueryData] = useState(
        queryString.parse(props.location.search)
    );
    console.log(queryData);

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
    const filterProps = {};
    const paginationProps = {
        setQueryData,
        queryData,
        total: props.total
    };

    return (
        <div className="container counselors">
            <div className="layout  flex_box between">
                <Filter />
                <div className="counselors_box">
                    <p className="count">검색결과 ({props.total}건)</p>
                    <ul className="flex_box between">
                        <li className="counselor">
                            <img src={doc1} alt="" />
                            <div className="txt_box">
                                <p className="level">마스터</p>
                                <p className="name">김진오</p>
                                <p className="certification">1급 상담사</p>
                                <p className="info">
                                    것은 그들의 가지에 그것을 피어나기 위하여
                                    가치를 거선의 바이며, 피다. 것은 곧 봄날의
                                    무엇이 부패뿐이다.
                                </p>
                                <button
                                    className="more_btn"
                                    onClick={() =>
                                        history.push("/counselors/1")
                                    }
                                >
                                    자세히 보기
                                    <MdZoomIn />
                                </button>
                            </div>
                        </li>
                        <li className="counselor">
                            <img src={doc2} alt="" />
                            <div className="txt_box">
                                <p className="level">마스터</p>
                                <p className="name">김진오</p>
                                <p className="certification">1급 상담사</p>
                                <p className="info">
                                    것은 그들의 가지에 그것을 피어나기 위하여
                                    가치를 거선의 바이며, 피다. 것은 곧 봄날의
                                    무엇이 부패뿐이다.
                                </p>
                                <button className="more_btn">
                                    자세히 보기
                                    <MdZoomIn />
                                </button>
                            </div>
                        </li>
                        <li className="counselor">
                            <img src={doc3} alt="" />
                            <div className="txt_box">
                                <p className="level">마스터</p>
                                <p className="name">김진오</p>
                                <p className="certification">1급 상담사</p>
                                <p className="info">
                                    것은 그들의 가지에 그것을 피어나기 위하여
                                    가치를 거선의 바이며, 피다. 것은 곧 봄날의
                                    무엇이 부패뿐이다.
                                </p>
                                <button className="more_btn">
                                    자세히 보기
                                    <MdZoomIn />
                                </button>
                            </div>
                        </li>
                        <li className="counselor">
                            <img src={doc2} alt="" />
                            <div className="txt_box">
                                <p className="level">마스터</p>
                                <p className="name">김진오</p>
                                <p className="certification">1급 상담사</p>
                                <p className="info">
                                    것은 그들의 가지에 그것을 피어나기 위하여
                                    가치를 거선의 바이며, 피다. 것은 곧 봄날의
                                    무엇이 부패뿐이다.
                                </p>
                                <button className="more_btn">
                                    자세히 보기
                                    <MdZoomIn />
                                </button>
                            </div>
                        </li>
                        <li className="counselor">
                            <img src={doc3} alt="" />
                            <div className="txt_box">
                                <p className="level">마스터</p>
                                <p className="name">김진오</p>
                                <p className="certification">1급 상담사</p>
                                <p className="info">
                                    것은 그들의 가지에 그것을 피어나기 위하여
                                    가치를 거선의 바이며, 피다. 것은 곧 봄날의
                                    무엇이 부패뿐이다.
                                </p>
                                <button className="more_btn">
                                    자세히 보기
                                    <MdZoomIn />
                                </button>
                            </div>
                        </li>
                        <li className="counselor">
                            <img src={doc1} alt="" />
                            <div className="txt_box">
                                <p className="level">마스터</p>
                                <p className="name">김진오</p>
                                <p className="certification">1급 상담사</p>
                                <p className="info">
                                    것은 그들의 가지에 그것을 피어나기 위하여
                                    가치를 거선의 바이며, 피다. 것은 곧 봄날의
                                    무엇이 부패뿐이다.
                                </p>
                                <button className="more_btn">
                                    자세히 보기
                                    <MdZoomIn />
                                </button>
                            </div>
                        </li>
                    </ul>
                    <Pagination {...paginationProps} />
                </div>
            </div>
        </div>
    );
};

export default Counselors;
