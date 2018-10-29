import * as React from "react";

import { inject, observer } from "mobx-react";
import styled from "styled-components";

import Paper from "@material-ui/core/Paper";
import { RootState } from "../../../src/state";
import { Address } from "../address";

const PaperStyled = styled(Paper)`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const NoResultsRoot = styled.div`
  color: #999;
`;

interface IListProps {
  store?: RootState;
}

const NoResults = () => (
  <NoResultsRoot>You haven't saved anything yet</NoResultsRoot>
);

@inject("store")
@observer
export class List extends React.Component<IListProps> {
  public render() {
    const list = this.props.store!.list;
    const selectFavourite = this.props.store!.selectFavourite;
    return (
      <PaperStyled>
        {list.map(item => (
          <Address
            key={item.placeId}
            restarant={item}
            onSelect={selectFavourite}
          />
        ))}

        {list.length === 0 && <NoResults />}
      </PaperStyled>
    );
  }
}
