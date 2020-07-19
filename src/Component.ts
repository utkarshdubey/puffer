import { Props } from "./typings/index";

export class Component {
  props: Props;

  constructor(props: any, public state = {}) {
    this.props = Object.assign(props, { children: [] });
  }

  setState(partialState: any) {
    this.state = Object.assign({}, this.state, partialState);
    console.log(partialState);
  }
}
