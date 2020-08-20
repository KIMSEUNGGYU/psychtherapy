import React, { useState, useEffect } from "react";
import "./Admin.scss";
import queryString from "query-string";
import { Table, Popup } from "client/components";
import { MdEdit } from "react-icons/md";

const AdminPartners = (props) => {
    console.log(props, "props");
    const [queryData, setQueryData] = useState(
        queryString.parse(props.location.search)
    );

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
        props.history.push(`/admin_partners?${query}`);
    }, [queryData]);

    const tableProps = {
        ths: {
            email: "이메일",
            name: "이름",
            gender: "성별",
            age: "나이",
            url: "동영상 링크",
            chatCost: "상담가",
            keyword: "키워드",
            level: "레벨",
            certificate: "자격증"
        },
        tds: props.partners,
        paginationProps: {
            setQueryData,
            queryData,
            total: props.total
        },
        actions: [
            {
                ic: <MdEdit />,
                className: "edit_btn",
                callbackFunc: (id) => {
                    Popup.partnerProfilePopup({
                        className: "partner_profile",
                        type: "edit",
                        id,
                        setQueryData: () => ({
                            ...queryData,
                            page: 1
                        })
                    });
                }
            }
        ]
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

export default AdminPartners;
``;
