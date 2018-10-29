import { action, computed, observable } from "mobx";
import { IReustarent } from "src/models";

import * as debounce from "debounce";

import * as initDebug from "debug";

import * as API from "../api";

const debug = initDebug("app:store");

export class RootState {
  @computed
  public get list() {
    return this.listInternal;
  }

  @computed
  public get results(): IReustarent[] | null {
    return this.searchResults;
  }

  @observable
  public searchInputValue = "";

  @observable
  public isLoadingShown = false;

  @observable
  private searchResults: IReustarent[] | null = null;

  @observable
  private listInternal: IReustarent[] = [];

  private search = debounce((strName: string) => {
    debug("search debounced", strName);
    API.geo.str2point(strName).then(this.onResult);
  }, 400);

  constructor() {
    this.listInternal = [];
  }

  @action
  public add = (e: IReustarent) => {
    if (this.results) {
      this.listInternal.push(e);
    }
    this.searchResults = null;
    this.searchInputValue = "";
  };

  @action
  public clear = () => {
    this.searchResults = null;
    this.searchInputValue = "";
  };

  @action
  public edit = (e: any) => {
    const value = e.target.value;
    this.searchInputValue = value;
    debug(value);
    this.search(value);
    this.isLoadingShown = true;
    this.searchResults = null;
  };

  @action
  public selectFavourite = (e: IReustarent) => {
    debug("select", e);
  };

  @action
  private onResult = (res: IReustarent[]) => {
    this.isLoadingShown = false;
    this.searchResults = res;
  };
}
