import { IPoint } from "./point";

export interface ISearchResult {
  streetName: string;
  pos: IPoint;
  placeId: string;
}

export interface IReustarent {
  streetName: string;
  pos: IPoint;
  placeId: string;
  title: string;
}

export const isReustarant = (a: any): a is IReustarent => !!a.title;
