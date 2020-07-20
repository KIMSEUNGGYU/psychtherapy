import React, { Component } from "react";
import "./Popup.scss";
import { MdClose } from "react-icons/md";
import { LayerPopup } from "client/libs/popup";

class PopupContainer extends Component {
    componentWillUnmount() {
        document.body.style.overflow = "visible";
    }

    componentDidUpdate(prevProps, prevState) {
        document.body.style.overflow = "hidden";
    }

    componentDidMount() {
        document.body.style.overflow = "hidden";
    }

    onClickClose = () => {
        LayerPopup.hide(this.props.layerKey);
    };
    blockBackspace = (e) => {
        let doPrevent;
        if (e.keyCode === 8) {
            let d = e.srcElement || e.target;
            if (
                d.tagName.toUpperCase() === "INPUT" ||
                d.tagName.toUpperCase() === "TEXTAREA"
            ) {
                doPrevent = d.readOnly || d.disabled;
            } else doPrevent = true;
        } else doPrevent = false;

        if (doPrevent) e.preventDefault();
    };
    render() {
        const newProps = {
            location: this.props.location,
            history: this.props.history,
            layerKey: this.props.layerKey,
            layerCount: this.props.layerCount,
            LayerPopup: LayerPopup
        };
        const { className } = this.props.children.props;

        return (
            <React.Fragment>
                <div
                    layerkey={this.props.layerKey}
                    className={`popup-container ${className ? className : ""}`}
                    id={className ? className : ""}
                    onKeyDown={this.blockBackspace}
                    tabIndex="0"
                >
                    <div className="popup center_box x y">
                        <button
                            className="close-btn"
                            onClick={this.onClickClose}
                        >
                            <MdClose />
                        </button>
                        {React.cloneElement(
                            this.props.children,
                            newProps,
                            this.props
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PopupContainer;
