import { createElement, render, Component } from '../../dist/puffer';

/** @jsx createElement */

class Home extends Component{
    render(){
        return(
            <div>
                <p style={{paddingTop: "5px"}}>ok</p>
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

render(<Home />, document.getElementById('app'));