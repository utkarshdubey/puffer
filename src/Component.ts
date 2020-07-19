import { Props } from "./typings/index";

export class Component<P = {}, S = {}> {
  constructor(public props: P, public state: S) {
    this.state = {} as any;
    this.props = props as Props<P>;
  }

  setState(partialState: any) {
    this.state = Object.assign({}, this.state, partialState);
    console.log(partialState);
  }
}
