import React,{Component} from "react";
import BntNav from "./BntNav";
import configBtn from "../configBtn.json"
import "../../css/NavMainStyle.css"
export default class NavMain extends Component{
    constructor (props){
        super(props);
        this.state={
            idBtnPrevious:1
        }
        this.eventBtnNav = this.eventBtnNav.bind(this);
        this.eventReturn = this.eventReturn.bind(this);
    }
    eventBtnNav(e){
        document.getElementById(this.state.idBtnPrevious).style="";
        document.getElementById(e.target.id).style.backgroundColor = "var(--color-forms)";
        document.getElementById(e.target.id).style.color = "var(--color-primary)";
        this.setState({
            idBtnPrevious:e.target.id
        });
        this.props.setStateForm(e.target.id);
    }
    eventReturn(e){
        document.getElementById(this.state.idBtnPrevious).style="";
        this.props.setStateForm(0);
    }
    render(){
        return (
            <div className="NavContiner">
                <div id="divH3" onClick={this.eventReturn}>
                    <h3>Menu Principal</h3>
                </div>
                {
                    configBtn.btnDate.map((el)=>(
                        <BntNav id={el.id} key={el.id} name={el.name} eventClik = {this.eventBtnNav}></BntNav>
                    ))
                }
            </div>
        );
    }
}