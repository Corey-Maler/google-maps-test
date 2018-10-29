import * as React from "react";

import { inject, observer } from "mobx-react";
import { RootState } from "../../state";
import { GoogleMaps } from "./engine/google";
import { Marker } from "./engine/google/marker";

interface IMapProps {
  store?: RootState;
}

@inject("store")
@observer
export class Map extends React.Component<IMapProps> {
  public render() {
    const list = this.props.store!.list;
    return (
      <React.Fragment>
        <GoogleMaps>
          {list.map(item => (
            <Marker key={item.placeId} reustarent={item} />
          ))}
        </GoogleMaps>
      </React.Fragment>
    );
  }
}
