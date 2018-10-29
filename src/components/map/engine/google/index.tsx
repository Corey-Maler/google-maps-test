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

  public componentWillReceiveProps(nextProps: IMapProps) {
    const map = this.state.map;
    if (this.props.center !== nextProps.center && nextProps.center && map) {
      (map as any).setCenter(nextProps.center);
    }
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

    const map = new maps.Map(node, {
      center: { lat: 0, lng: 0 },
      zoom: 8
    });

    this.setState({ map, google: maps });
    map.addListener("click", this.onClick);

    debug("map initialited", map);
  }

  private onClick = (e: any) => {
    if (this.props.select) {
      this.props.select(e);
    }
  };
}
