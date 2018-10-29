import * as config from "./config.json";

import * as initDebug from "debug";
const debug = initDebug("app:map-api");
export const Maps = async (): Promise<any> => {
  return new Promise(res => {
    debug("map loaded", config);
    const callback = "initMap";
    (window as any)[callback] = () => {
      res((window as any).google.maps);
    };

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
  });
};
