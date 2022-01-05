import React from "react";
import ReactDOM from 'react-dom';
import NavMain from "../components/NavMain";
import "../../css/BodyContainerStyle.css";
export default function BodyRegistro(){
    const [stateForm,setStateForm] = React.useState(0);
    /*const formSelection =()=>{
        if(stateForm==0){
            return (<FormWelcome></FormWelcome>);
        }else if(stateForm==1){
            return (<FormIngreso stateBodyContainer = {this}></FormIngreso>);
        }else if(stateForm==2){
            return (<FormShowDate></FormShowDate>);
        }else if(stateForm==3){
            return (<FormDownload></FormDownload>);
        }else if(stateForm==4){
            return (<FormAddTyC></FormAddTyC>);
        }else{
            return (<FormWelcome></FormWelcome>);
        }
    } */
    return (
        <>
            <section className="contentMainBody">
                <div className="BodyContainer">
                    <NavMain setStateForm={setStateForm}></NavMain>
                    {
                        /*formSelection()*/
                    }
                </div>
            </section>
        </>
    );
}
if (document.getElementById('Registro')) {
    ReactDOM.render(<BodyRegistro />, document.getElementById('Registro'));
}