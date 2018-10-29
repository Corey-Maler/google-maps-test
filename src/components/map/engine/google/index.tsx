import * as React from "react";
import { IMapProps } from "../../interface";

import * as initDebug from "debug";

import styled from "styled-components";
import { Maps } from "../../../../api/geo/engine/google/loader";
import { Provider } from "./proveder";

const debug = initDebug("app:map");

const MapRoot = styled.div`
  width: 100%;
  height: 100%;
`;

interface IGoogleMapsState {
  google: any;
  map: any | null;
}

export class GoogleMaps extends React.Component<IMapProps, IGoogleMapsState> {
  public state = {
    google: null,
    map: null
  };
  private rootRef = React.createRef();

  public componentDidMount() {
    this.loadMap();
  }

  public render() {
    return (
      <MapRoot ref={this.rootRef as any}>
        <Provider value={this.state}>{this.props.children}</Provider>
      </MapRoot>
    );
  }

  private async loadMap() {
    const maps = await Maps();

    debug("map loaded", this.rootRef);
    const node = this.rootRef.current;

    const uluru = { lat: -25.344, lng: 131.036 };

    const map = new maps.Map(node, {
      center: uluru,
      zoom: 8
    });

    this.setState({ map, google: maps });
    map.addListener("click", this.onClick);

    debug("map initialited", map);
  }

  private onClick = (e: any) => {
    debug("on map click", e);
  };
}
