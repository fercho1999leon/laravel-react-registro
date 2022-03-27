import React,{Component} from "react";
import {motion} from 'framer-motion';
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

const variants = {
    haidenLabel:{
        opacity:0,
    },
    showLabel:{
        opacity:1,
        transition:{
            duration:2
        }
    }
}

export default class BntNav extends Component{
    constructor (props){
        super(props);
    }
    render(){
        return (
            <motion.div
                className="StyleBtn FontStyleNav"
                whileHover={{
                    backgroundColor:'var(--color-secondary)'
                }}
            >
                <motion.label
                    className="FontStyleNav"
                    htmlFor={this.props.id}
                >
                    {
                        selectIcon(parseInt(this.props.id))
                    }
                </motion.label>
                <motion.input
                    variants={variants}
                    initial={{
                        opacity: 1,
                    }}
                    animate={this.props.openNav?'haidenLabel':'showLabel'}
                    className="FontStyleNav"
                    hidden={this.props.openNav} id={this.props.id}
                    key={this.props.id}
                    type="button"
                    value={this.props.name}
                    onClick={this.props.eventClik}
                />
            </motion.div>
        );
    }
}
BntNav.defaultProps={
    id:"btnDefault",
    name:"default"
};
