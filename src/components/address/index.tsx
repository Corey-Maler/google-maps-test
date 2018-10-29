import * as React from "react";

import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import ImageIcon from "@material-ui/icons/Image";
import { IReustarent } from "src/models";
interface IAddressProps {
  onSelect: (r: IReustarent) => void;
  restarant: IReustarent;
}

export const Address = ({ onSelect, restarant }: IAddressProps) => (
  // tslint:disable-next-line:jsx-no-lambda
  <ListItem onClick={_ => onSelect(restarant)} button={true}>
    <Avatar>
      <ImageIcon />
    </Avatar>
    <ListItemText
      primary={restarant.streetName}
      secondary={`${restarant.pos.lat}, ${restarant.pos.lng}`}
    />
  </ListItem>
);
