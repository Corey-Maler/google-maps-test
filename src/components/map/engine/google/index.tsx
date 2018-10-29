import * as React from "react";
import { IMapProps } from "../../interface";

import * as initDebug from "debug";

import styled from "styled-components";

import * as config from "./config.json";

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

  private loadMap() {
    debug("map loaded", config);
    const callback = "initMap";
    (window as any)[callback] = this.onMapLoaded;

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      config["api-key"]
    }&callback=${callback}`;

    const head = document.head;
    if (head) {
      head.appendChild(script);
    }

    /*
    <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>
    */
  }

  private onMapLoaded = () => {
    debug("map loaded", this.rootRef);
    const node = this.rootRef.current;

    const uluru = { lat: -25.344, lng: 131.036 };

    this.map = new (window as any).google.maps.Map(node, {
      center: uluru,
      zoom: 8
    });

    this.map.addListener("click", this.onClick);

    debug("map initialited", this.map);

    const marker = new (window as any).google.maps.Marker({
      map: this.map,
      position: uluru
    });
    debug("marker", marker);
  };

  private onClick = (e: any) => {
    debug("on map click", e);
  };
}
