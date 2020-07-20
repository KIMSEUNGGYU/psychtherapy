import React from "react";
import "./Counselors.scss";
import { MdZoomIn } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa";
import { Filter, Pagination } from "client/components";
import doc1 from "client/images/doc1.jpg";
import doc2 from "client/images/doc2.jpg";
import doc3 from "client/images/doc3.jpg";

const Counselors = () => {
    const paginationProps = {
        total: 80,
        queryData: {
            limit: "25",
            offset: "0"
        },
        setQueryData: () => {}
    };

    return (
        <div className="container counselors">
            <div className="layout  flex_box between">
                <Filter />
                <div className="counselors_box">
                    <p className="count">검색결과 (6건)</p>
                    <ul className="flex_box between">
                        <li className="counselor">
                            <div className="point_box">
                                <FaBitcoin /> 5point
                            </div>
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
                        <li className="counselor">
                            <div className="point_box">
                                <FaBitcoin /> 5point
                            </div>
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
                            <div className="point_box">
                                <FaBitcoin /> 5point
                            </div>
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
                            <div className="point_box">
                                <FaBitcoin /> 5point
                            </div>
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
                            <div className="point_box">
                                <FaBitcoin /> 5point
                            </div>
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
                            <div className="point_box">
                                <FaBitcoin /> 5point
                            </div>
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
