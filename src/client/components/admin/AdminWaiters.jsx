import React, { useState, useEffect } from "react";
import "./Admin.scss";
import queryString from "query-string";
import { Table } from "client/components";
import { MdPersonAdd } from "react-icons/md";
import { Popup } from "client/components";

const AdminWaiters = (props) => {
    const [queryData, setQueryData] = useState(
        queryString.parse(props.location.search)
    );

    useEffect(() => {
        setQueryData(queryString.parse(props.location.search));
        props.getPartners({ ...queryData, evaluate: false });
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
        props.history.push(`/admin_waiters?${query}`);
    }, [queryData]);

    const tableProps = {
        ths: {
            email: "이메일",
            name: "이름",
            gender: "성별",
            age: "나이"
        },
        tds: props.partners,
        paginationProps: {
            setQueryData,
            queryData,
            total: props.total
        },
        actions: [
            {
                ic: <MdPersonAdd />,
                className: "enter_btn",
                callbackFunc: () => {
                    Popup.partnerProfilePopup({
                        className: "partner_profile",
                        type: "enter"
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

export default AdminWaiters;
``;
