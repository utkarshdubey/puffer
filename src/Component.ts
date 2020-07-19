export default class Component<P = {}> {
  constructor(public props: P, public state = {}) {}

  setState(partialState: any) {
    this.state = Object.assign({}, this.state, partialState);
    console.log(partialState);
  }
}
