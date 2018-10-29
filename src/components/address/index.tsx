import * as React from "react";

import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import ImageIcon from "@material-ui/icons/Image";
import { IReustarent, ISearchResult, isReustarant } from "src/models";
interface IAddressProps {
  onSelect: (r: IReustarent | ISearchResult) => void;
  restarant: IReustarent | ISearchResult;
  selected?: boolean;
}

export const Address = ({ onSelect, selected, restarant }: IAddressProps) => (
  // tslint:disable-next-line:jsx-no-lambda
  <ListItem
    selected={selected}
    // tslint:disable-next-line:jsx-no-lambda
    onClick={_ => onSelect(restarant)}
    button={true}
  >
    <Avatar>
      <ImageIcon />
    </Avatar>
    <ListItemText
      primary={isReustarant(restarant) ? restarant.title : restarant.streetName}
      secondary={
        isReustarant(restarant)
          ? restarant.streetName
          : `${restarant.pos.lat}, ${restarant.pos.lng}`
      }
    />
  </ListItem>
);
