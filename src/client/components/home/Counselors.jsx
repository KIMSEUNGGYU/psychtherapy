import React from "react";
import "./Counselors.scss";
import t from "client/images/t.jpg";

const Counselors = () => {
    return (
        <div className="section feature">
            <div className="layout">
                <p className="section_name">FEATURE</p>
                <p className="section_title">영락과 찾아다녀도, 이것이다</p>
                <div className="intro_box flex_box between">
                    <img src={t} alt="img" />
                    <div className="intro_txt_box">
                        <p className="intro_txt_title">
                            청춘의 것은 무엇을 봄바람이다
                        </p>
                        <p className="intro_txt_description">
                            굳세게 기쁘며, 두기 가치를 우리 사막이다. 사랑의
                            긴지라 능히 평화스러운 이 새 속에서 뼈 안고,
                            교향악이다. 살았으며, 우리는 어디 하였으며, 장식하는
                            그들은 청춘에서만 거선의 봄바람이다.
                            <br /> 현저하게 용기가 이상의 전인 행복스럽고 돋고,
                            품고 청춘의 교향악이다. 피는 역사를 끝에 그들의
                            사막이다.
                        </p>
                        <div className="btn_box">
                            <button className="popup_btn">이용 가이드</button>
                            <button className="link_btn">요금 안내</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counselors;
