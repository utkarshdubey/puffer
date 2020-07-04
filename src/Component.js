export class Component{
    constructor(props){
        this.props = props; 
        this.state = this.state || {};
    }
    setState(partialState){
        this.state = Object.assign({}, this.state, partialState);
    }
        
}
