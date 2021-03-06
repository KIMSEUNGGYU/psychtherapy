import React from "react";

import { LayerPopup } from "client/libs/popup";
import PopupContainer from "./PopupContainer";
import LoginPopup from "./LoginPopup";
import JoinPopup from "./JoinPopup";
import PartnerProfilePopup from "./PartnerProfilePopup";
import UserProfilePopup from "./UserProfilePopup";

export default class Popup {
    static partnerProfilePopup(props) {
        return LayerPopup.show(
            <PopupContainer>
                <PartnerProfilePopup {...props} />
            </PopupContainer>
        );
    }
    static userProfilePopup(props) {
        return LayerPopup.show(
            <PopupContainer>
                <UserProfilePopup {...props} />
            </PopupContainer>
        );
    }
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
