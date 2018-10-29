import { action, computed, observable } from "mobx";

export class InputVM {
  @observable
  public value: string = "";

  constructor(public readonly placeholder: string) {}

  @action
  public onChange = (e: any) => {
    // tslint:disable-next-line:no-console
    this.value = e.target.value;
  };

  @computed
  public get valid() {
    return this.value.length > 0;
  }

  @action
  public reset = () => {
    this.value = "";
  };

  @computed
  public get model() {
    return {
      onChange: this.onChange,
      // tslint:disable-next-line:no-console
      placeholder: this.placeholder,
      value: this.value
    };
  }
}
