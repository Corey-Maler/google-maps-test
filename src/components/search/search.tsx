import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";

import InputBase from "@material-ui/core/InputBase";
import LinearProgress from "@material-ui/core/LinearProgress";

import Button from "@material-ui/core/Button";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { RootState } from "../../state";
import { Address } from "../address";

const PaperStyled = styled(Paper)`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const InputBaseStyled = styled(InputBase)`
  border: 1px solid #a9a9a9;
  padding: 3px;
  display: flex !important;
  margin: 20px 0;
  border-radius: 3px;
`;

const Footer = styled.div`
  margin-top: 12px;
`;

const ButtonS = styled(Button)`
  margin-right: 12px !important;
`;

interface ISearchProps {
  store?: RootState;
}

const NoResults = () => <div style={{ color: "#666" }}>No results</div>;

@inject("store")
@observer
export class Search extends React.Component<ISearchProps> {
  public render() {
    const store = this.props.store as RootState; // Typescript Inject bug
    const results = store.results;
    return (
      <PaperStyled>
        <Typography variant="h6" component="h3">
          Search new place
        </Typography>

        <InputBaseStyled
          onChange={store.edit}
          value={store.searchInputValue}
          placeholder="Enter address"
        />

        {store.isLoadingShown && <LinearProgress />}

        {results &&
          results
            .slice(0, 6)
            .map(res => (
              <Address
                selected={res === store.searchSelectedResult}
                key={res.placeId}
                restarant={res}
                onSelect={store.selectResult}
              />
            ))}

        {results &&
          results.length > 0 && (
            <Footer>
              <InputBaseStyled {...store.nameInputVm.model} />
              <ButtonS color="primary" onClick={store.save}>
                Save
              </ButtonS>
              <Button color="default" onClick={store.clear}>
                Clear
              </Button>
            </Footer>
          )}

        {results && results.length === 0 && <NoResults />}
      </PaperStyled>
    );
  }
}
