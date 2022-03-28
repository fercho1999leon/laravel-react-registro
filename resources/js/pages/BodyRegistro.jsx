import React from "react";
import ReactDOM from 'react-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavMain from "../components/NavMain";
import "../../css/BodyContainerStyle.css";
import Welcome from "../components/Welcome";
import {ProviderLogin} from '../components/ContextLogin';
import FormAddTyC from "../components/FormAddTyC";
import FormNewUser from "../components/FormNewUser";
import HeaderMain from "../components/head/HeaderMain";
import ShowCalendar from "../components/ShowCalendar";
import View from "../components/viewRegister/View";

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
    const [openNav,setOpenNav]=React.useState(false);
    const [dateJson,setDateJson] = React.useState(null);
    const [configSate,setConfigState] = React.useState(null);
    const [stateForm,setStateForm] = React.useState("0");
    React.useEffect(() => {
        importConfig(setConfigState,setDateJson);
    }, []);
    const formSelection =(opc)=>{
        if(opc===0){
            return (<Welcome></Welcome>);
        }
        const selectNav = () =>{
            if(opc===1){
                return (<View id={opc}/>);
            }else if(opc===2){
                return (<FormAddTyC id={opc}/>);
            }else if(opc===3){
                return (<ShowCalendar/>);
            }else if(opc===1000){
                return (<FormNewUser id={opc}/>);
            }
        }
        return configSate?findJson(configSate,stateForm)?selectNav():<></>:<></>;
    }
    return (
        <>
            <Grid container spacing={0} direction="row" wrap="nowrap">
                <Grid item xs="auto">
                    <Box
                        sx={{
                            width: openNav?"80px":"180px",
                            height: "96.5vh",
                            margin:"10px",
                            backgroundColor: 'var(--color-primary)',
                            borderRadius:5,
                            transition: "width 0.5s",
                        }}
                    >
                        <NavMain openNav={openNav} setStateForm={setStateForm} configSate = {configSate}></NavMain>
                    </Box>
                </Grid>
                <Grid item xs maxWidth={500}>
                    <Grid container spacing={0} direction="column" >
                        <HeaderMain openNav={openNav} setOpenNav={setOpenNav} ></HeaderMain>
                        <Box
                            sx={{
                                width: "100%",
                                height: "90vh",
                            }}
                        >
                            <ProviderLogin value = {{dateJson,setDateJson,configSate}}>
                                <section className="contentMainBody">
                                    <div className="BodyContainer">
                                        {
                                            formSelection(parseInt(stateForm))
                                        }
                                    </div>
                                </section>
                            </ProviderLogin>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
if (document.getElementById('Registro')) {
    ReactDOM.render(<BodyRegistro />, document.getElementById('Registro'));
}
