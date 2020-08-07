import React, { useEffect } from "react";
import "./Admin.scss";
import { Table, Popup } from "client/components";

const Admin = () => {
    useEffect(() => {
        Popup.profilePopup({
            className: "profile"
        });
    }, []);
    const tableProps = {
        ths: {
            e_mail: "이메일",
            level: "레벨",
            name: "이름",
            gender: "성별",
            age: "나이",
            phone_number: "전화 번호"
        },
        tds: [
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            },
            {
                e_mail: "ab12b1125@gmail.com",
                level: 1,
                name: "이준영",
                gender: "여자",
                age: 28,
                phone_number: "010-7278-8789"
            }
        ],
        paginationProps: {
            setQueryData: () => {},
            queryData: {
                offset: 0,
                limit: 25
            },
            total: 40
        }
    };
    return (
        <div className="admin container">
            <div className="layout">
                {/* <p className="title">대기자 리스트</p> */}
                <Table {...tableProps} />
            </div>
        </div>
    );
};

export default Admin;
