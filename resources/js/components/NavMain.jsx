import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import BntNav from "./BntNav";
import "../../css/NavMainStyle.css"
export default function NavMain(props){
    const [idBtnPreviousState,setIdBtnPreviousState] = React.useState(1);
    function eventBtnNav(e){
        document.getElementById(idBtnPreviousState).style="";
        document.getElementById(e.target.id).style.backgroundColor = "var(--color-forms)";
        document.getElementById(e.target.id).style.color = "var(--color-primary)";
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
                <h3>Menu Principal</h3>
            </div>
            {
                props.configSate?props.configSate.map((el)=>(
                    <BntNav id={el.id} key={el.id} name={el.name} eventClik = {eventBtnNav}></BntNav>
                )): <CircularProgress />
            }
        </div>
    );
}