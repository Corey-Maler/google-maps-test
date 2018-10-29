import { IPoint } from "src/models/point";

export interface IMapProps {
  select?: (e: any) => void;
  center?: IPoint;
}
