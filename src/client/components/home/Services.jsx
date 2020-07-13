import React from "react";
import "./Services.scss";
import img1 from "client/images/service1.jpg";
import img2 from "client/images/service2.jpg";
import img3 from "client/images/service3.jpg";
import img4 from "client/images/service4.jpg";
import img5 from "client/images/service5.jpg";
import img6 from "client/images/service6.jpg";
import img7 from "client/images/service7.jpg";
import img8 from "client/images/service8.jpg";

const Services = () => {
    return (
        <div className="section services">
            <div className="layout">
                <p className="section_name">SERVICES</p>
                <p className="section_title">열매를 인간이 아름다우냐?</p>
                <div className="service_box flex_box between">
                    <div className="service_content">
                        <img src={img1} alt="img1" />
                        <p className="service_title">기분 전환</p>
                        <p className="service_description">
                            우리 물방아 귀는 피어나기 능히 가치를 구하지 것이다.
                            것이다.보라, 피에 청춘이
                        </p>
                    </div>{" "}
                    <div className="service_content">
                        <img src={img2} alt="img1" />
                        <p className="service_title">기분 전환</p>
                        <p className="service_description">
                            우리 물방아 귀는 피어나기 능히 가치를 구하지 것이다.
                            것이다.보라, 피에 청춘이
                        </p>
                    </div>{" "}
                    <div className="service_content">
                        <img src={img3} alt="img1" />
                        <p className="service_title">기분 전환</p>
                        <p className="service_description">
                            우리 물방아 귀는 피어나기 능히 가치를 구하지 것이다.
                            것이다.보라, 피에 청춘이
                        </p>
                    </div>{" "}
                    <div className="service_content">
                        <img src={img4} alt="img1" />
                        <p className="service_title">기분 전환</p>
                        <p className="service_description">
                            우리 물방아 귀는 피어나기 능히 가치를 구하지 것이다.
                            것이다.보라, 피에 청춘이
                        </p>
                    </div>{" "}
                    <div className="service_content">
                        <img src={img5} alt="img1" />
                        <p className="service_title">기분 전환</p>
                        <p className="service_description">
                            우리 물방아 귀는 피어나기 능히 가치를 구하지 것이다.
                            것이다.보라, 피에 청춘이
                        </p>
                    </div>{" "}
                    <div className="service_content">
                        <img src={img6} alt="img1" />
                        <p className="service_title">기분 전환</p>
                        <p className="service_description">
                            우리 물방아 귀는 피어나기 능히 가치를 구하지 것이다.
                            것이다.보라, 피에 청춘이
                        </p>
                    </div>{" "}
                    <div className="service_content">
                        <img src={img7} alt="img1" />
                        <p className="service_title">기분 전환</p>
                        <p className="service_description">
                            우리 물방아 귀는 피어나기 능히 가치를 구하지 것이다.
                            것이다.보라, 피에 청춘이
                        </p>
                    </div>{" "}
                    <div className="service_content">
                        <img src={img8} alt="img1" />
                        <p className="service_title">기분 전환</p>
                        <p className="service_description">
                            우리 물방아 귀는 피어나기 능히 가치를 구하지 것이다.
                            것이다.보라, 피에 청춘이
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
