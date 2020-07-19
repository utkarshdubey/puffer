import { State, Props } from './typings/index.d'

export class Component{
    constructor(public props: Props, public state: State = {}){}

    setState(partialState){
        this.state = Object.assign({}, this.state, partialState);
        console.log(partialState);
    }
}
