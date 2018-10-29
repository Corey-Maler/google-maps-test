import * as React from "react";
import { IMapProps } from "../../interface";

import * as initDebug from "debug";

import styled from "styled-components";
import { Maps } from "../../../../api/geo/engine/google/loader";

const debug = initDebug("app:map");

const MapRoot = styled.div`
  width: 100%;
  height: 100%;
`;

export class GoogleMaps extends React.Component<IMapProps> {
  private rootRef = React.createRef();

  private map: any;
  public componentDidMount() {
    this.loadMap();
  }

  public render() {
    return <MapRoot ref={this.rootRef as any}>asf</MapRoot>;
  }

  private async loadMap() {
    const maps = await Maps();

    debug("map loaded", this.rootRef);
    const node = this.rootRef.current;

    const uluru = { lat: -25.344, lng: 131.036 };

    this.map = new maps.Map(node, {
      center: uluru,
      zoom: 8
    });

    this.map.addListener("click", this.onClick);

    debug("map initialited", this.map);

    const marker = new maps.Marker({
      map: this.map,
      position: uluru
    });
    debug("marker", marker);
  }

  private onClick = (e: any) => {
    debug("on map click", e);
  };
}
