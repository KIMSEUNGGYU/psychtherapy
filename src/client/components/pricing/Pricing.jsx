import React, { useState, useEffect } from "react";
import "./Pricing.scss";
import Iamport from "react-iamport";
import { getToken } from "client/others/token";
import { Popup } from "client/components";

const _identificationCode = "imp59422487";
const Pricing = (props) => {
    const { user } = props;
    const [prices, setPrices] = useState({
        normal: 1,
        export: 1,
        master: 1
    });
    const [iamportParams, setIamportParams] = useState({
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "Be Simple 포인트 충전",
        m_redirect_url: window.location.origin + "pricing"
    });

    useEffect(() => {
        setIamportParams((params) => ({
            ...params,
            buyer_name: user.name,
            buyer_email: user.email
        }));
    }, [props.user]);

    useEffect(() => {
        props.getUser();
    }, []);

    const onClickMinus = (key) => {
        if (prices[key] === 1) {
            return;
        }
        setPrices((prices) => ({
            ...prices,
            [key]: prices[key] - 1
        }));
    };
    const onClickPlus = (key) => {
        setPrices((prices) => ({
            ...prices,
            [key]: prices[key] + 1
        }));
    };
    const chargePoint = (res, point) => {
        if (res.success) {
            props.putChargePoint({
                userId: user.id,
                point
            });
        }
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
                            <p className="top_txt">
                                텍스트 테라피 {30 * prices.normal}분 상담권
                            </p>
                            <p className="card_title">일반 상담사</p>
                            <p className="price">
                                <span className="sign">&#8361;</span>
                                {25000 * prices.normal}
                            </p>
                            <p className="point">
                                <button
                                    className="minus_btn"
                                    onClick={() => onClickMinus("normal")}
                                >
                                    -
                                </button>
                                {prices.normal} POINT
                                <button
                                    className="plus_btn"
                                    onClick={() => onClickPlus("normal")}
                                >
                                    +
                                </button>
                            </p>
                            <Iamport
                                identificationCode={_identificationCode}
                                params={{
                                    ...iamportParams,
                                    amount: 1 //test
                                    // amount: 25000 * prices.normal
                                }}
                                onFailed={(err) => console.log(err, "error")}
                                onSuccess={(res) =>
                                    chargePoint(res, prices.normal)
                                }
                                jqueryLoaded={false}
                                render={(renderProps) => (
                                    <button
                                        className="pay_btn"
                                        onClick={() => {
                                            if (getToken()) {
                                                renderProps.onClick();
                                            } else {
                                                Popup.loginPopup({
                                                    className: "login"
                                                });
                                            }
                                        }}
                                    >
                                        충전하기
                                    </button>
                                )}
                            />
                        </li>
                        <li>
                            <p className="top_txt">
                                텍스트 테라피 {30 * prices.master}분 상담권
                            </p>
                            <p className="card_title">마스터 상담사</p>
                            <p className="price">
                                <span className="sign">&#8361;</span>
                                {75000 * prices.master}
                            </p>
                            <p className="point">
                                <button
                                    className="minus_btn"
                                    onClick={() => onClickMinus("master")}
                                >
                                    -
                                </button>
                                {3 * prices.master} POINT
                                <button
                                    className="plus_btn"
                                    onClick={() => onClickPlus("master")}
                                >
                                    +
                                </button>
                            </p>
                            <Iamport
                                identificationCode={_identificationCode}
                                params={{
                                    ...iamportParams,
                                    amount: 75000 * prices.master
                                }}
                                onFailed={(err) => console.log(err, "error")}
                                onSuccess={(res) =>
                                    chargePoint(res, 3 * prices.master)
                                }
                                jqueryLoaded={false}
                                render={(renderProps) => (
                                    <button
                                        className="pay_btn"
                                        onClick={() => {
                                            if (getToken()) {
                                                renderProps.onClick();
                                            } else {
                                                Popup.loginPopup({
                                                    className: "login"
                                                });
                                            }
                                        }}
                                    >
                                        충전하기
                                    </button>
                                )}
                            />{" "}
                        </li>
                        <li>
                            <p className="top_txt">
                                텍스트 테라피 {30 * prices.export}분 상담권
                            </p>
                            <p className="card_title">전문 상담사</p>
                            <p className="price">
                                <span className="sign">&#8361;</span>
                                {50000 * prices.export}
                            </p>
                            <p className="point">
                                <button
                                    className="minus_btn"
                                    onClick={() => onClickMinus("export")}
                                >
                                    -
                                </button>
                                {2 * prices.export} POINT
                                <button
                                    className="plus_btn"
                                    onClick={() => onClickPlus("export")}
                                >
                                    +
                                </button>
                            </p>
                            <Iamport
                                identificationCode={_identificationCode}
                                params={{
                                    ...iamportParams,
                                    amount: 50000 * prices.export
                                }}
                                onFailed={(err) => console.log(err, "error")}
                                onSuccess={(res) =>
                                    chargePoint(res, 2 * prices.master)
                                }
                                jqueryLoaded={false}
                                render={(renderProps) => (
                                    <button
                                        className="pay_btn"
                                        onClick={() => {
                                            if (getToken()) {
                                                renderProps.onClick();
                                            } else {
                                                Popup.loginPopup({
                                                    className: "login"
                                                });
                                            }
                                        }}
                                    >
                                        충전하기
                                    </button>
                                )}
                            />{" "}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
