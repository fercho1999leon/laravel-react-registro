import React,{Component} from "react";
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import "../../css/BntNavStyle.css";

const selectIcon = (opc=0) =>{
    if(opc===1){
        return (<AssignmentRoundedIcon/>);
    }else if(opc===2){
        return null;
    }else if(opc===3){
        return null;
    }else if(opc===4){
        return (<SettingsRoundedIcon/>);
    }else if(opc===5){
        return (<CalendarTodayRoundedIcon/>);
    }else if(opc===1000){
        return (<AddCircleOutlineRoundedIcon/>);
    }
}

export default class BntNav extends Component{
    constructor (props){
        super(props);
    }
    render(){
        return (
            <div className="StyleBtn FontStyleNav" >
                <label className="FontStyleNav" htmlFor={this.props.id}>{selectIcon(parseInt(this.props.id))}</label>
                <input className="FontStyleNav" hidden={this.props.openNav} id={this.props.id} key={this.props.id} type="button" value={this.props.name} onClick={this.props.eventClik}/>
            </div>
        );
    }
}
BntNav.defaultProps={
    id:"btnDefault",
    name:"default"
};
