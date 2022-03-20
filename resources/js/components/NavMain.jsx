import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import BntNav from "./BntNav";
import "../../css/NavMainStyle.css"
import logo from "../../../public/images/LOGO-BLANCO.svg"

export default function NavMain(props){
    const [idBtnPreviousState,setIdBtnPreviousState] = React.useState(1);
    function eventBtnNav(e){
        setIdBtnPreviousState(e.target.id);
        props.setStateForm(e.target.id);
    }
    function eventReturn(e){
        document.getElementById(idBtnPreviousState).style="";
        props.setStateForm(0);
    }
    return (
        <div className="NavContiner">
            <div id="divH3" onClick={eventReturn}>
                {props.openNav?<img height="50px" src={logo} />:<h3 hidden={props.openNav} style={{
                    margin:5
                }}>Menu Principal</h3>}
            </div>
            {
                props.configSate?props.configSate.map((el)=>(
                    <BntNav openNav={props.openNav} id={el.id} key={el.id} name={el.name} eventClik = {eventBtnNav}></BntNav>
                )): <CircularProgress />
            }
        </div>
    );
}
