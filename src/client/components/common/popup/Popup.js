import React from "react";

import { LayerPopup } from "client/libs/popup";
import PopupContainer from "./PopupContainer";
import LoginPopup from "./LoginPopup";
import JoinPopup from "./JoinPopup";

export default class Popup {
    static loginPopup(props) {
        return LayerPopup.show(
            <PopupContainer>
                <LoginPopup {...props} />
            </PopupContainer>
        );
    }
    static joinPopup(props) {
        return LayerPopup.show(
            <PopupContainer>
                <JoinPopup {...props} />
            </PopupContainer>
        );
    }
}
