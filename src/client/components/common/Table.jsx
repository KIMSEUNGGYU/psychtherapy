import React from "react";
import "./Table.scss";
import { Pagination } from "client/components";
import moment from "moment";

const Table = (props) => {
    const { ths, tds, actions, paginationProps, nonePaginationsProps } = props;
    console.log(tds, "???");
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
                                        if (action.commonBtn) {
                                            const currentTime = moment();
                                            const reservedTime = moment(el["startedAt"]);
                                            const duration = moment.duration(currentTime.diff(reservedTime)).asMinutes();
                                            if ( 0 <= duration && duration <= 30) {
                                                return (
                                                    <td className="actions" key={actionKey}>
                                                        <button className={ action.className }
                                                            onClick={() => action.callbackFunc(el["roomId"])}>
                                                            입장하기
                                                        </button>
                                                    </td>
                                                );
                                            }

                                            if ( duration < 0) {
                                                return (
                                                    <td className="actions" key={actionKey}>
                                                        <button className={action.className}
                                                            disabled={true}
                                                        >
                                                            입장하기
                                                        </button>
                                                    </td>
                                                );
                                            }
                                            if ( duration > 30) {
                                                return (
                                                    <td className="actions" key={actionKey}>
                                                        <button className={action.className}
                                                            onClick={() => action.callbackFunc(el["roomId"])}
                                                        >
                                                            상담내역
                                                        </button>
                                                    </td>
                                                );
                                            }
                                        }
                                        return (
                                            <td
                                                className="actions"
                                                key={actionKey}
                                            >
                                                <button
                                                    className={action.className}
                                                    onClick={() =>
                                                        action.callbackFunc(
                                                            el["id"]
                                                        )
                                                    }
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
            {nonePaginationsProps ? "" : <Pagination {...paginationProps} />}
        </div>
    );
};

export default Table;
