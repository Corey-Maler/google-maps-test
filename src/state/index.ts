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
  public get results(): IReustarent[] | null {
    return this.searchResults;
  }

  @computed
  public get selectedPoint(): IPoint | undefined {
    if (this.selected) {
      return this.selected.pos;
    }

    return undefined;
  }

  @observable
  public searchInputValue = "";

  @observable
  public isLoadingShown = false;

  @observable
  private searchResults: IReustarent[] | null = null;

  @observable
  private listInternal: IReustarent[] = [];

  @observable
  private selected: IReustarent | undefined = undefined;

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
  public mapClick = async (e: any) => {
    const v = e.latLng;
    debug("map click", v);
    this.isLoadingShown = true;
    this.searchResults = null;
    const res = await API.geo.point2str(v);
    this.isLoadingShown = false;
    this.searchResults = res;
  };

  @action
  public selectFavourite = (e: IReustarent) => {
    debug("select", e);
    this.selected = e;
  };

  @action
  private onResult = (res: IReustarent[]) => {
    this.isLoadingShown = false;
    this.searchResults = res;
  };
}
