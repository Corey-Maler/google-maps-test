import * as React from "react";
import { IPoint } from "src/models/point";

import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import ImageIcon from "@material-ui/icons/Image";
interface IAddressProps {
  streetName: string;
  pos: IPoint;
}

export const Address = ({ streetName, pos }: IAddressProps) => (
  <ListItem button={true}>
    <Avatar>
      <ImageIcon />
    </Avatar>
    <ListItemText primary={streetName} secondary={`${pos.lat}, ${pos.lng}`} />
  </ListItem>
);
