import { ClassComponent, Props } from "./typings/index";

export default class Component<P = {}> implements ClassComponent {
  props: P & Props;
  prototype: Component<{}>;
  constructor(props: P, public state = {}) {
    this.props = Object.assign(this.props, { children: [] });
  }
  render() {
    return this.props;
  }
  getDerivedStateFromProps?(props: object, state: object): object {
    throw new Error("Method not implemented.");
  }

  setState(partialState: any) {
    this.state = Object.assign({}, this.state, partialState);
    console.log(partialState);
  }
}
