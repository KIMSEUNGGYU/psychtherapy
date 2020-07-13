import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { EventName } from "./EventName";
import { LayerKeyGen } from "./LayerKeyGen";

class LayerPopupContainer extends Component {
  constructor(props) {
    super(props);
    this.fireLayerEvent = this.fireLayerEvent.bind(this);

    Object.keys(EventName).forEach((name, idx) => {
      document.addEventListener(name, this.fireLayerEvent, false);
    });

    this.state = {
      reload: 0
    };

    this.layers = {};
  }

  fireLayerEvent(evt) {
    if (evt.type === EventName.showLayer) {
      this.layers = {
        ...this.layers,
        [evt.detail.layerKey]: evt.detail.layerComponent
      };
    } else if (evt.type === EventName.hideLayer) {
      delete this.layers[evt.detail.layerKey];
    } else if (evt.type === EventName.clearLayer) {
      this.layers = {};
    }

    this.setState({ reload: this.state.reload + 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(this.layers).length === 0) {
      LayerKeyGen.reset();
    }
  }

  render() {
    return (
      <React.Fragment>
        {Object.keys(this.layers).map((layerKey, i) => {
          let layerProps = {
            key: layerKey,
            layerKey,
            location: this.props.location,
            history: this.props.history,
            layerCount: Object.keys(this.layers).length
          };
          if (this.layers[layerKey]) {
            if (typeof this.layers[layerKey] === "function") {
              return this.layers[layerKey](layerProps);
            } else {
              return React.cloneElement(this.layers[layerKey], layerProps);
            }
          } else {
            return null;
          }
        })}
      </React.Fragment>
    );
  }
}

export default withRouter(LayerPopupContainer);
