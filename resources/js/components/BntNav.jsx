import React,{Component} from "react";
import "../../css/BntNavStyle.css";

export default class BntNav extends Component{
    constructor (props){
        super(props);
    }
    render(){
        return (
            <div className="StyleBtn" >
                <label htmlFor={this.props.id}>-</label>
                <input hidden={this.props.openNav} id={this.props.id} key={this.props.id} type="button" value={this.props.name} onClick={this.props.eventClik}/>
            </div>
        );
    }
}
BntNav.defaultProps={
    id:"btnDefault",
    name:"default"
};
