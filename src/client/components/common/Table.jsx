import React from "react";
import "./Table.scss";
import { MdModeEdit, MdDelete, MdEdit } from "react-icons/md";
import { Pagination } from "client/components";

const Table = (props) => {
    const {
        ths, tds, paginationProps
    } = props;
    return (
        <div className="table_box">
            <table>
                <thead>
                    <tr>
                        {Object.keys(ths).map((el, key) => {
                            return <th key={key}>{ths[el]}</th>;
                        })}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tds.map((el, key) => {
                        return (
                            <tr key={key}>
                                {
                                    Object.keys(ths).map((ele, i) => {
                                        return <td>{el[ele]}</td>;
                                    })
                                }
                                <td>
                                    <button className="edit_btn"><MdEdit /></button>
                                    <button className="delete_btn"><MdDelete /></button>
                                </td>
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
