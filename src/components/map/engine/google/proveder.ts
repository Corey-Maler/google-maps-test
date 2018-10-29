import * as React from "react";

interface IMapProvided {
  map: any | null;
  google: any;
}

const p = React.createContext<IMapProvided>({ map: null, google: null });

export const Provider = p.Provider;
export const Consumer = p.Consumer;
