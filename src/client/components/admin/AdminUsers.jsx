import React, { useState, useEffect } from "react";
import "./Admin.scss";
import queryString from "query-string";
import { Table, Popup } from "client/components";

const AdminUsers = (props) => {
    const [queryData, setQueryData] = useState(
        queryString.parse(props.location.search)
    );

    useEffect(() => {
        setQueryData(queryString.parse(props.location.search));
        props.getUsers(queryData);
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
        props.history.push(`/admin_users?${query}`);
    }, [queryData]);

    const tableProps = {
        ths: {
            name: "이름",
            gender: "성별",
            age: "나이",
            email: "이메일"
        },
        tds: props.users,
        paginationProps: {
            setQueryData,
            queryData,
            total: props.total
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

export default AdminUsers;
