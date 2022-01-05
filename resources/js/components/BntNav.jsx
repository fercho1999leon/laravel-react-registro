import React,{Component} from "react";
import "../../css/BntNavStyle.css";
export default class BntNav extends Component{
    constructor (props){
        super(props);
    }
    render(){
        return (
            <>
                <input id={this.props.id} key={this.props.id} className="StyleBtn" type="button" value={this.props.name} onClick={this.props.eventClik}/>
            </>
        );
    }
}
BntNav.defaultProps={
    id:"btnDefault",
    name:"default"
};