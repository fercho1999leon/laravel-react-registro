import React from "react";
import ReactDOM from 'react-dom';
import NavMain from "../components/NavMain";
import "../../css/BodyContainerStyle.css";
import Welcome from "../components/Welcome";
import {ProviderLogin} from '../components/ContextLogin';
import FormIngreso from "../components/FormIngreso";
import FormShowDate from "../components/FormShowDate";
import FormDownload from "../components/FormDownload";
import FormAddTyC from "../components/FormAddTyC";
import FormNewUser from "../components/FormNewUser";
const importConfig = (setConfigState,setDateJson) =>{
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
            setConfigState(DataJson['configNav']);
            setDateJson(DataJson['config']);
        } catch (error) {
            //console.log(res);
            document.open();
            document.write(res);
            document.close();
        }
    });
};
const findJson = (matriz,element) =>{
    let state = false;
    matriz.map(el =>{
        if(el['id']==element){
            state = true;
        }
    });
    return state;
}
const cerrarSession = () =>{
    fetch('/logout',{
        method: 'GET', 
    }).then(res => {return res.text()})
    .then(respuesta => {
        document.open();
        document.write(respuesta);
        document.close();

    });
}
export default function BodyRegistro(){
    const [dateJson,setDateJson] = React.useState(null);
    const [configSate,setConfigState] = React.useState(null);
    const [stateForm,setStateForm] = React.useState(0);
    React.useEffect(() => {
        importConfig(setConfigState,setDateJson);
    }, []);
    const formSelection =()=>{
        if(stateForm==0){
            return (<Welcome></Welcome>);
        }
        if(stateForm==100){
            cerrarSession();
            return (<Welcome></Welcome>);
        }
        const selectNav = () =>{
            if(stateForm==1){
                return (<FormIngreso id={stateForm}></FormIngreso>);
            }else if(stateForm==2){
                return (<FormShowDate id={stateForm}></FormShowDate>);
            }else if(stateForm==3){
                return (<FormDownload id={stateForm}></FormDownload>);
            }else if(stateForm==4){
                return (<FormAddTyC id={stateForm}></FormAddTyC>);
            }else if(stateForm==1000){
                return (<FormNewUser id={stateForm}></FormNewUser>);
            }
        } 
        return configSate?findJson(configSate,stateForm)?selectNav():<></>:<></>;
    }
    return (
        <ProviderLogin value = {{dateJson,setDateJson,configSate}}>
            <section className="contentMainBody">
                <div className="BodyContainer">
                    <NavMain setStateForm={setStateForm} configSate = {configSate}></NavMain>
                    {
                        formSelection()
                    }
                </div>
            </section>
        </ProviderLogin>
    );
}
if (document.getElementById('Registro')) {
    ReactDOM.render(<BodyRegistro />, document.getElementById('Registro'));
}