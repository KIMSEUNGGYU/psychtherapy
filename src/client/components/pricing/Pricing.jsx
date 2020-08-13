import React from "react";
import "./Pricing.scss";
import axios from "axios";

const Pricing = () => {
    const onClickPay = () => {
        let config = {
            headers: {
                Authorization: `KakaoAK f314affe38c755754379a94c022fb46c`,
                accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                "Cache-Control": "no-cache:",
                Pragma: "no-cache"
            }
        };
        let data = {
            partner_order_id: "20200813",
            partner_user_id: "test",
            item_name: "상담권",
            quantity: 3,
            total_amount: 1,
            tax_free_amount: 0.1,
            approval_url: "/pricing",
            cancel_url: "/pricing",
            fail_url: "/pricing"
        };

        axios
            .post("https://kapi.kakao.com/v1/payment/ready", data, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div className="container pricing">
            <div className="layout">
                <p className="title">요금 안내</p>
                <p className="description">
                    원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는
                    4년으로 하며, 1차에 한하여 중임할 수 있다.
                </p>
                <div className="card_box">
                    <ul className="flex_box between">
                        <li>
                            <p className="top_txt">텍스트 테라피 30분 상담권</p>
                            <p className="card_title">일반 상담사</p>
                            <p className="price">
                                <span className="sign">&#8361;</span>
                                25,000
                            </p>
                            <p className="point">
                                <button className="minus_btn">-</button>1 POINT
                                <button className="plus_btn">+</button>
                            </p>
                            <button className="pay_btn" onClick={onClickPay}>
                                결제하기
                            </button>
                        </li>
                        <li>
                            <p className="top_txt">텍스트 테라피 30분 상담권</p>
                            <p className="card_title">마스터 상담사</p>
                            <p className="price">
                                <span className="sign">&#8361;</span>
                                65,000
                            </p>
                            <p className="point">
                                <button className="minus_btn">-</button>5 POINT
                                <button className="plus_btn">+</button>
                            </p>
                            <button className="pay_btn">결제하기</button>
                        </li>
                        <li>
                            <p className="top_txt">텍스트 테라피 30분 상담권</p>
                            <p className="card_title">전문 상담사</p>
                            <p className="price">
                                <span className="sign">&#8361;</span>
                                50,000
                            </p>
                            <p className="point">
                                <button className="minus_btn">-</button>3 POINT
                                <button className="plus_btn">+</button>
                            </p>
                            <button className="pay_btn">결제하기</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
