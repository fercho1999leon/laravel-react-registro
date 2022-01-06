import React from "react";
import ReactDOM from 'react-dom';
import NavMain from "../components/NavMain";
import "../../css/BodyContainerStyle.css";
import Welcome from "../components/Welcome";
import {ProviderLogin} from '../components/ContextLogin';
import FormIngreso from "../components/FormIngreso";
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
        const selectNav = () =>{
            if(stateForm==1){
                return (<FormIngreso></FormIngreso>);
            }else if(stateForm==2){
                return (<Welcome></Welcome>);
            }else if(stateForm==3){
                return (<Welcome></Welcome>);
            }else if(stateForm==4){
                return (<Welcome></Welcome>);
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