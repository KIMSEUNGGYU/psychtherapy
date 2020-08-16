import React from "react";
import "./Table.scss";
import { MdModeEdit, MdDelete, MdEdit } from "react-icons/md";
import { Pagination } from "client/components";

const Table = (props) => {
    const { ths, tds, actions, paginationProps } = props;
    return (
        <div className="table_box">
            <table>
                <thead>
                    <tr>
                        {Object.keys(ths).map((el, key) => {
                            return <th key={key}>{ths[el]}</th>;
                        })}
                        {actions && <th className="actions"></th>}
                    </tr>
                </thead>
                <tbody>
                    {tds.map((el, key) => {
                        return (
                            <tr key={key}>
                                {Object.keys(ths).map((ele, i) => {
                                    if (ele === "gender") {
                                        return (
                                            <td key={i}>
                                                {el[ele] === 1
                                                    ? "남자"
                                                    : "여자"}
                                            </td>
                                        );
                                    }
                                    return <td key={i}>{el[ele]}</td>;
                                })}
                                {actions &&
                                    actions.map((action, actionKey) => {
                                        return (
                                            <td
                                                className="actions"
                                                key={actionKey}
                                            >
                                                <button
                                                    className={action.className}
                                                >
                                                    {action.ic}
                                                </button>
                                            </td>
                                        );
                                    })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination {...paginationProps} />
        </div>
    );
};

export default Table;
