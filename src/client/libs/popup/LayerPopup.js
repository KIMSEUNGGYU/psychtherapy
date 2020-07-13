import { LayerKeyGen } from "./LayerKeyGen";
import { EventName } from "./EventName";
import { store } from "client/store";
// import { actions as globalActions } from "modules/global";

(function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(
            event,
            params.bubbles,
            params.cancelable,
            params.detail
        );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();

export default class LayerPopup {
    static show(layerComponent) {
        // var ClearEvt = new CustomEvent(EventName.clearLayer, {
        // 	detail: {}
        // });
        // document.dispatchEvent(ClearEvt);
        // LayerPopup.clear();

        const layerKey = LayerKeyGen.getLayerKey();
        var evt = new CustomEvent(EventName.showLayer, {
            detail: {
                layerKey,
                layerComponent
            }
        });

        document.dispatchEvent(evt);
        return layerKey;
    }

    static hide(layerKey) {
        var evt = new CustomEvent(EventName.hideLayer, {
            detail: {
                layerKey
            }
        });
        document.dispatchEvent(evt);
        const reduxState = store.getState();
        // if (!reduxState.signingFinished)
        //     store.dispatch(
        //         globalActions.closePopup({
        //             payload: { signingFinished: false }
        //         })
        //     );
    }

    static clear() {
        var evt = new CustomEvent(EventName.clearLayer, {
            detail: {}
        });
        document.dispatchEvent(evt);
    }
}
