import * as React from "react";

import { List } from "../list";
import { Search } from "../search/search";

export class SidePanel extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Search />
        <List />
      </React.Fragment>
    );
  }
}
