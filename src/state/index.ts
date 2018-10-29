import { action, computed, observable } from "mobx";
import { IReustarent, ISearchResult } from "src/models";

import * as debounce from "debounce";

import * as initDebug from "debug";

import * as API from "../api";
import { IPoint } from "../models/point";
import { InputVM } from "./input-vm";

const debug = initDebug("app:store");

export class RootState {
  @computed
  public get list() {
    return this.listInternal;
  }

  @computed
  public get results(): ISearchResult[] | null {
    return this.searchResults;
  }

  @computed
  public get selectedPoint(): IPoint | undefined {
    if (this.selected) {
      return this.selected.pos;
    }

    return undefined;
  }

  public readonly nameInputVm = new InputVM("Reustarant name");

  @observable
  public searchInputValue = "";

  @observable
  public isLoadingShown = false;

  @observable
  public searchSelectedResult: ISearchResult | undefined = undefined;

  @observable
  private searchResults: ISearchResult[] | null = null;

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
  public selectResult = (e: ISearchResult) => {
    this.searchSelectedResult = e;
  };

  @action
  public clear = () => {
    this.searchResults = null;
    this.searchInputValue = "";
    this.searchSelectedResult = undefined;

    this.nameInputVm.reset();
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
  public save = () => {
    if (this.nameInputVm.valid && this.searchSelectedResult) {
      this.listInternal.push({
        title: this.nameInputVm.value,
        ...this.searchSelectedResult
      });

      this.clear();
    }
  };

  @action
  private onResult = (res: IReustarent[]) => {
    this.isLoadingShown = false;
    this.searchResults = res;
  };
}
