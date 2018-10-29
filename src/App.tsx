import * as React from "react";
import "./App.css";

import { Provider } from "mobx-react";

import { PageLayout } from "./container/page";

import { RootState } from "./state";

const rootState = new RootState();

class App extends React.Component {
  public select = () => {
    throw new Error("not impelemnted");
  };
  public render() {
    return (
      <Provider store={rootState}>
        <PageLayout />
      </Provider>
    );
  }
}

export default App;
