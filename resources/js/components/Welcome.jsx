import React,{Component} from "react";
import "../../css/WelcomeStyle.css"
import LogoS from "../media/LOGO-S.svg"

export default class Welcome extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="logoWelcome">
                <img src={LogoS} />
            </div>
        );
    }
}