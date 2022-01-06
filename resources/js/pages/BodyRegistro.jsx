import React from "react";
import ReactDOM from 'react-dom';
import NavMain from "../components/NavMain";
import "../../css/BodyContainerStyle.css";
import Welcome from "../components/Welcome";
const importConfigBtn = (setConfigState) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    fetch('/registro',{
        headers:{
            'X-CSRF-TOKEN':token,
            'Content-type':'application/json',
        },
        method:'POST',
    }).then(res =>{
        return res.text();
    }).then(res => {
        try {
            const DataJson = JSON.parse(res);
            setConfigState(DataJson);
        } catch (error) {
            //console.log(res);
            document.open();
            document.write(res);
            document.close();
        }
    });
};
export default function BodyRegistro(){
    const [configSate,setConfigState] = React.useState(null);
    const [stateForm,setStateForm] = React.useState(0);
    React.useEffect(() => {
        importConfigBtn(setConfigState);
    }, []);
    const formSelection =()=>{
        if(stateForm==0){
            return (<Welcome></Welcome>);
        }/*else if(stateForm==1){
            return (<FormIngreso></FormIngreso>);
        }else if(stateForm==2){
            return (<FormShowDate></FormShowDate>);
        }else if(stateForm==3){
            return (<FormDownload></FormDownload>);
        }else if(stateForm==4){
            return (<FormAddTyC></FormAddTyC>);
        }else{
            return (<FormWelcome></FormWelcome>);
        }*/
    }
    return (
        <>
            <section className="contentMainBody">
                <div className="BodyContainer">
                    <NavMain setStateForm={setStateForm} configSate = {configSate}></NavMain>
                    {
                        formSelection()
                    }
                </div>
            </section>
        </>
    );
}
if (document.getElementById('Registro')) {
    ReactDOM.render(<BodyRegistro />, document.getElementById('Registro'));
}