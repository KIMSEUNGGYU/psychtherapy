import React from "react";
import "./Filter.scss";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { keywords } from "client/others/const";

const Filter = (props) => {
    const { gender, level, certificate, keyword } = props.queryData;

    const onClickFilter = (e, key, el) => {
        console.log(key);
        props.setQueryData((queryData) => ({
            ...queryData,
            page: 1,
            [key]: el
        }));
    };
    return (
        <div className="filter_box">
            <p className="title">
                상담사 찾기
                {/* <span>
                    <MdRefresh /> 검색 초기화
                </span> */}
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
                    <li
                        className={`${level === "1" && "active"}`}
                        onClick={(e) => onClickFilter(e, "level", "1")}
                    >
                        {level === "1" ? (
                            <MdRadioButtonChecked />
                        ) : (
                            <MdRadioButtonUnchecked />
                        )}{" "}
                        마스터 상담사
                    </li>
                    <li
                        className={`${level === "2" && "active"}`}
                        onClick={(e) => onClickFilter(e, "level", "2")}
                    >
                        {level === "2" ? (
                            <MdRadioButtonChecked />
                        ) : (
                            <MdRadioButtonUnchecked />
                        )}{" "}
                        전문 상담사
                    </li>
                    <li
                        className={`${level === "3" && "active"}`}
                        onClick={(e) => onClickFilter(e, "level", "3")}
                    >
                        {level === "3" ? (
                            <MdRadioButtonChecked />
                        ) : (
                            <MdRadioButtonUnchecked />
                        )}{" "}
                        일반 상담사
                    </li>
                </ul>
            </div>
            <div className="filter_content">
                <p className="sub_title">고민 키워드</p>
                {keywords.map((el, key) => {
                    return (
                        <span
                            className={`${
                                decodeURI(keyword) === el && "active"
                            } keyword`}
                            key={key}
                            onClick={(e) => onClickFilter(e, "keyword", el)}
                        >
                            {el}
                        </span>
                    );
                })}
            </div>
            <div className="filter_content">
                <p className="sub_title">상담사 자격증</p>
                <ul>
                    <li
                        className={`${certificate === "1" && "active"}`}
                        onClick={(e) => onClickFilter(e, "certificate", "1")}
                    >
                        {certificate === "1" ? (
                            <MdRadioButtonChecked />
                        ) : (
                            <MdRadioButtonUnchecked />
                        )}{" "}
                        1급 자격증
                    </li>
                    <li
                        className={`${certificate === "2" && "active"}`}
                        onClick={(e) => onClickFilter(e, "certificate", "2")}
                    >
                        {certificate === "2" ? (
                            <MdRadioButtonChecked />
                        ) : (
                            <MdRadioButtonUnchecked />
                        )}{" "}
                        2급 자격증
                    </li>
                    <li
                        className={`${certificate === "3" && "active"}`}
                        onClick={(e) => onClickFilter(e, "certificate", "3")}
                    >
                        {certificate === "3" ? (
                            <MdRadioButtonChecked />
                        ) : (
                            <MdRadioButtonUnchecked />
                        )}{" "}
                        3급 자격증
                    </li>
                </ul>
            </div>
            <div className="filter_content">
                <p className="sub_title">상담사 성별</p>
                <ul>
                    <li
                        className={`${gender === "1" && "active"}`}
                        onClick={(e) => onClickFilter(e, "gender", "1")}
                    >
                        {gender === "1" ? (
                            <MdRadioButtonChecked />
                        ) : (
                            <MdRadioButtonUnchecked />
                        )}{" "}
                        남자
                    </li>
                    <li
                        className={`${gender === "2" && "active"}`}
                        onClick={(e) => onClickFilter(e, "gender", "2")}
                    >
                        {gender === "2" ? (
                            <MdRadioButtonChecked />
                        ) : (
                            <MdRadioButtonUnchecked />
                        )}{" "}
                        여자
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Filter;
