import React from "react";
import "./Filter.scss";
import {
    MdRefresh,
    MdSearch,
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdRadioButtonChecked,
    MdRadioButtonUnchecked
} from "react-icons/md";
const Filter = () => {
    return (
        <div className="filter_box">
            <p className="title">
                상담사 찾기
                <span>
                    <MdRefresh /> 검색 초기화
                </span>
            </p>
            {/* <div className="search_box">
                <input
                    type="text"
                    className="search_input"
                    placeholder="상담사 이름 검색"
                />
                <button className="search_btn">
                    <MdSearch />
                </button>
            </div> */}
            <div className="filter_content">
                <p className="sub_title">상담사 레벨</p>
                <ul>
                    <li className="active">
                        <MdCheckBox /> 마스터 상담사
                    </li>
                    <li className="active">
                        <MdCheckBox /> 전문 상담사
                    </li>
                    <li>
                        <MdCheckBox /> 일반 상담사
                    </li>
                </ul>
            </div>
            <div className="filter_content">
                <p className="sub_title">고민 키워드</p>
                <span className="keyword active">우울</span>
                <span className="keyword active">불안</span>
                <span className="keyword">강박</span>
                <span className="keyword">무기력</span>
                <span className="keyword">자살</span>
                <span className="keyword active">자해</span>
                <span className="keyword">친구</span>
                <span className="keyword active">공황</span>
                <span className="keyword">부부</span>
                <span className="keyword">연인</span>
                <span className="keyword">진로</span>
                <span className="keyword">취업</span>
                <span className="keyword">성소수자</span>
                <span className="keyword">감정조절</span>
            </div>
            <div className="filter_content">
                <p className="sub_title">상담사 자격증</p>
                <ul>
                    <li className="active">
                        <MdCheckBox /> 1급 자격증
                    </li>
                    <li className="active">
                        <MdCheckBox /> 2급 자격증
                    </li>
                    <li>
                        <MdCheckBox /> 3급 자격증
                    </li>
                </ul>
            </div>
            <div className="filter_content">
                <p className="sub_title">상담사 성별</p>
                <ul>
                    <li className="active">
                        <MdRadioButtonChecked /> 무관
                    </li>
                    <li>
                        <MdRadioButtonUnchecked /> 남자
                    </li>
                    <li>
                        <MdRadioButtonUnchecked /> 여자
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Filter;
