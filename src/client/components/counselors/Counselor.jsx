import React from "react";
import "./Counselor.scss";
import { AiOutlineYoutube } from "react-icons/ai";
import doc1 from "client/images/doc1.jpg";
import { Scheduler } from "client/components";

const Counselor = (props) => {
    const { prev_search, id } = props.match.params;
    console.log(props, "props");
    return (
        <div className="container counselor">
            <div className="layout">
                <div className="breadcrumb">
                    <button onClick={() => props.history.push("/")}>홈</button>
                    <span> &#62; </span>
                    <button
                        onClick={() =>
                            props.history.push(`/partners?${prev_search}`)
                        }
                    >
                        나만의 상담사 찾기
                    </button>
                    <span> &#62; </span>
                    <button>상담사 상세 정보</button>
                </div>
                <div className="top_box flex_box between">
                    <div className="img_box">
                        <img src={doc1} alt="" />
                    </div>
                    <div className="txt_box">
                        <p className="level">1급 마스터 상담사</p>
                        <p className="name">
                            안녕하세요
                            <br /> 김진오 상담사입니다
                        </p>
                        <div className="career_box">
                            <ul>
                                <li>
                                    - 상담심리사 1급(상담심리전문가)
                                    (한국상담심리학회)
                                </li>
                                <li>- 상담심리사 2급(상담심리전문가)</li>
                                <li>- 임상심리사 1급(한국산업인력공단)</li>
                                <li>- 임상심리사 2급(한국산업인력공단)</li>
                            </ul>
                        </div>
                        <p className="long_info">
                            국회의원과 정부는 법률안을 제출할 수 있다.
                            국무회의는 대통령·국무총리와 15인 이상 30인 이하의
                            국무위원으로 구성한다. 감사원은 원장을 포함한 5인
                            이상 11인 이하의 감사위원으로 구성한다. 법관이
                            중대한 심신상의 장해로 직무를 수행할 수 없을 때에는
                            법률이 정하는 바에 의하여 퇴직하게 할 수 있다.
                            법관이 중대한 심신상의 장해로 직무를 수행할 수 없을
                        </p>
                        <button className="youtube_btn">
                            <AiOutlineYoutube />
                            소개 영상 보러가기
                        </button>
                        {/* <button className="put_btn">상담 신청하기</button> */}
                    </div>
                    {/* <div className="put_box">
                        <div className="notice">
                            <p className="notice_title">결제 안내</p>
                            <p className="notice_txt">
                                대한민국의 영토는 한반도와 그 부속도서로 한다.
                                국회는 상호원조 또는 안전보장에 관한 조약 중요한
                                국제조직에 관한 조약, 국회는 상호원조
                            </p>
                        </div>
                        <div className="point_box flex_box between">
                            <p className="label">상담 가격</p>
                            <p className="value">5Point</p>
                        </div>
                        <button
                            className="put_btn"
                            onClick={() =>
                                props.history.push(
                                    "/counselors/1/counseling_payment"
                                )
                            }
                        >
                            상담 신청하기
                        </button>
                    </div> */}
                </div>
                <div className="scheduler_box">
                    <p className="sub_title">상담 가능 시간</p>
                    <Scheduler {...props} />
                </div>
                <div className="payment_box flex_box between">
                    <p className="total">TOTAL :</p>
                    <div className="right_box">
                        <span className="point">5 POINT</span>
                        <button className="pay_btn">상담 신청하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counselor;
