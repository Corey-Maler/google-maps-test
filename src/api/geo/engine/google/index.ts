import { IPoint } from "src/models/point";

const wait = (t: number) => {
  return new Promise(res => {
    setTimeout(() => res(), t);
  });
};

export const str2point = async (strName: string): Promise<IPoint> => {
  await wait(1000);
  return { lat: 34.343, lng: 434 };
};
