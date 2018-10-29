import * as initDebug from "debug";

const debug = initDebug("app:maps-api");

import { IReustarent } from "../../../../models";
import { Maps } from "./loader";

/*
const wait = (t: number) => {
  return new Promise(res => {
    setTimeout(() => res(), t);
  });
};
*/

export const str2point = async (strName: string): Promise<IReustarent[]> => {
  const maps = await Maps();
  // tslint:disable-next-line:no-debugger
  const geocoder = new maps.Geocoder();
  return new Promise<IReustarent[]>((res, rej) => {
    geocoder.geocode({ address: strName }, (results: any, status: any) => {
      debug("result", results, status);
      if (status === "OK") {
        const found = results.map((place: any) => ({
          placeId: place.place_id,
          pos: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          streetName: place.formatted_address
        }));
        res(found);
      } else {
        if (status === "ZERO_RESULTS") {
          res([]);
        } else {
          rej(status);
        }
      }
    });
  });
};

export const point2str = async (latLng: any): Promise<IReustarent[]> => {
  const maps = await Maps();
  // tslint:disable-next-line:no-debugger
  const geocoder = new maps.Geocoder();
  return new Promise<IReustarent[]>((res, rej) => {
    geocoder.geocode({ location: latLng }, (results: any, status: any) => {
      debug("result", results, status);
      if (status === "OK") {
        const found = results.map((place: any) => ({
          placeId: place.place_id,
          pos: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          streetName: place.formatted_address
        }));
        res(found);
      } else {
        if (status === "ZERO_RESULTS") {
          res([]);
        } else {
          rej(status);
        }
      }
    });
  });
};
