import { action, computed, observable } from "mobx";
import { IReustarent } from "src/models";

import * as debounce from "debounce";

import * as initDebug from "debug";

import * as API from "../api";
import { IPoint } from "../models/point";

const debug = initDebug("app:store");

export class RootState {
  @computed
  public get list() {
    return this.listInternal;
  }

  @computed
  public get result(): IReustarent | null {
    return this.searchResult;
  }

  @observable
  public searchInputValue = "df";

  @observable
  public isLoadingShown = false;

  @observable
  private searchResult: IReustarent | null = null;

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
  public add = () => {
    if (this.result) {
      this.listInternal.push(this.result);
    }
    this.searchResult = null;
    this.searchInputValue = "";
  };

  @action
  public clear = () => {
    this.searchResult = null;
    this.searchInputValue = "";
  };

  @action
  public edit = (e: any) => {
    const value = e.target.value;
    this.searchInputValue = value;
    debug(value);
    this.search(value);
    this.isLoadingShown = true;
    this.searchResult = null;
  };

  @action
  private onResult = (res: IPoint) => {
    this.isLoadingShown = false;
    this.searchResult = {
      pos: res,
      streetName: "sadsf"
    };
  };
}
