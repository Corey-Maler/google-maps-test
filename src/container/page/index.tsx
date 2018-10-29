import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Map } from "../../components/map";
import { SidePanel } from "../../components/side-panel";

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
`;

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PanelContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 350px;
`;

export class PageLayout extends React.Component {
  public render() {
    return (
      <Root>
        <GlobalStyle />
        <MapContainer>
          <Map />
        </MapContainer>
        <PanelContainer>
          <SidePanel />
        </PanelContainer>
      </Root>
    );
  }
}
