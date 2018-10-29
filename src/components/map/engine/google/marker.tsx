import * as React from "react";

import { IReustarent } from "../../../../models/index";
import { Consumer } from "./proveder";

interface IMarkerProps {
  reustarent: IReustarent;

  map: any;
  google: any;
}

export class MarkerR extends React.Component<IMarkerProps> {
  private marker: any;

  constructor(props: IMarkerProps) {
    super(props);
    this.marker = new props.google.Marker({
      map: props.map,
      position: props.reustarent.pos
    });
  }

  public componentWillUnmount() {
    this.marker.setMap(null);
  }

  public render() {
    return null;
  }
}

export const Marker = (props: { reustarent: IReustarent }) => (
  <Consumer>
    {value =>
      value.map && <MarkerR google={value.google} map={value.map} {...props} />
    }
  </Consumer>
);
