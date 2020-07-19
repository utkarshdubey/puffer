import { createElement, render, Component } from '../../dist/puffer.modern';


/** @jsx createElement */

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {hello: 0, world: 20}
    }
    render(){
        this.setState({hello: 1})
        console.log(this.state);
        return(
            <div>
                <p style={{color: "blue", fontWeight: 'bolder', textDecoration: 'underline'}}>Hello World</p>
            </div>
        )
    }
}

// const neela = "blue";

// const element = (
//     <div>
//         <h1 style={{margin: '5px'}}>Hello</h1>
//         <p style={{color: neela}}>Are you there? Cus I am nobody really.</p>
//         <a href="google.com">Visit Page 2</a>
//     </div>
// )

// const container = document.getElementById('app');
// render(element, container);

const o = <Home />
// console.log(o)
render(<Home />, document.getElementById('app'));