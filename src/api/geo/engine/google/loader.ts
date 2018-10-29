import * as config from "./config.json";

import * as initDebug from "debug";
const debug = initDebug("app:map-api");

let p: any;
export const Maps = async (): Promise<any> => {
  if (!p) {
    p = new Promise(res => {
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
  }

  return p;
};
