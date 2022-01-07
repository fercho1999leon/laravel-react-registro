import * as React from 'react';
import {Component} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import "../../../css/FormIngresoStyle.css";
import ContextLogin from '../ContextLogin';
const styleRadio = {
    margin: "auto 10px"
}
const packageData=(dataUpDate,setSatateConsulta,configSate)=>{
    const arrayData = document.getElementsByClassName('dataOut');
    const text = document.getElementsByClassName('text-result-get');
    let estadoUsuario;
    const typeInteres = arrayData[4].checked ? 1:2;
    const idUpdate=dataUpDate.correo;
    if(arrayData[9].checked){estadoUsuario=1}
    else if(arrayData[10].checked){estadoUsuario=2}
    else if(arrayData[11].checked){estadoUsuario=3}
    let archivoDatos={
        nombre:arrayData[0].value==""?dataUpDate.nombre:arrayData[0].value,
        apellido:arrayData[1].value==""?dataUpDate.apellido:arrayData[1].value,
        correo:arrayData[2].value==""?dataUpDate.correo:arrayData[2].value,
        numeroContacto:arrayData[3].value==""?dataUpDate.numero:arrayData[3].value,
        typeInteres,
        interes:arrayData[6].selectedIndex,
        observacion:arrayData[7].value,
        ciudad:arrayData[8].selectedIndex,
        estado:estadoUsuario,
        idUpdate,
        configSate,
    }
    archivoDatos = JSON.stringify(archivoDatos);
    let formData = new FormData();
    formData.append('data', archivoDatos);
    fetch('',{
        method: 'POST', 
        body: formData, 
    }).then(response => {
        return response.text();
    }).then(respuestaText =>{
        if(respuestaText==0){
            setSatateConsulta(true);
            text['0'].textContent="Usuario actualizado... ";
        }else if(respuestaText==1){
            setSatateConsulta(true);
            text['0'].textContent="Error al actualizar... ";
        }
    });
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  
  function ChildModal(props) {
    const [open, setOpen] = React.useState(false);
    const configSate = React.useContext(ContextLogin);
    const [stateConsulta, setSatateConsulta] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
      packageData(props.dataUpDate,setSatateConsulta,configSate['configSate']);
    };
    const handleClose = () => {
        setOpen(false);
        props.setCloseParent(false);
    };
  
    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Actualizar</Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style}}>
            <h2 id="child-modal-title">Actualizacion</h2>
            <p id="child-modal-description">
              {stateConsulta?<h3 className='text-result-get'>Procesando</h3>:<CircularProgress />}
            </p>
            <Button onClick={handleClose}>Cerrar</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
class RenderListInteres extends Component {
    constructor(props){
        super(props);
        this.state={
            nodoInteres:1
        }
    }
    eventRadioInteres = (e) =>{
        if(e.target.id=="idCarrera"){
            this.setState({
                nodoInteres:1
            });
        }else if(e.target.id=="idCurso"){
            this.setState({
                nodoInteres:2
            });
        }
    }
    selectChecked =(opc)=>{
        if(this.state.nodoInteres == opc){
            return true;
        }else{
            return false;
        }
    }
    renderList(){
        if(this.state.nodoInteres==1){
            let valorCarrera = -1;
            const statusCarrera = () =>{
                this.props.dateJson['dateJson'].listInteresC.map(
                    (el)=>{
                        this.props.dataUpDate.carrera_idcarrera.map((elC)=>{
                            if(elC==el.name){
                                valorCarrera = el.id;
                            }
                        });
                    }
                )
            };   
            statusCarrera();        
            return(
                <>
                    <h3>Interes</h3>
                    <label htmlFor="idCarrera">Carrera</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idCarrera" name="interes" value="carrera" onClick={this.eventRadioInteres} defaultChecked={this.selectChecked(1)}/>
                    <label htmlFor="idCurso">Curso</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idCurso" name="interes" value="curso" onClick={this.eventRadioInteres} defaultChecked={this.selectChecked(2)} />
                    <select className="FormIngresoStyleComponents dataOut" id="idInteres">
                        <option key={0} value="0">Selccione</option>
                        {
                            this.props.dateJson['dateJson'].listInteresC.map(
                                (el)=>(
                                    <option key={el.id} value={el.id} selected={valorCarrera==el.id?true:false}>{el.name}</option>
                                )
                            )
                        }
                    </select>
                </>
            );
        }else if(this.state.nodoInteres==2){
            let valorCurso = -1;
            const statusCurso = () =>{
                this.props.dateJson['dateJson'].listInteresT.map(
                    (el)=>{
                        this.props.dataUpDate.curso_idcurso.map((elT)=>{
                            if(elT==el.name){
                                valorCurso = el.id;
                            }
                        });
                    }
                )
            };   
            statusCurso();   
            return(
                <>
                    <h3>Interes</h3>
                    <label htmlFor="idCarrera">Carrera</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idCarrera" name="interes" value="carrera" onClick={this.eventRadioInteres} defaultChecked={this.selectChecked(1)} />
                    <label htmlFor="idCurso">Curso</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idCurso" name="interes" value="curso" onClick={this.eventRadioInteres} defaultChecked={this.selectChecked(2)} />
                    <select className="FormIngresoStyleComponents dataOut" id="idInteres">
                        <option key={0} value="0">Selccione</option>
                        {
                            this.props.dateJson['dateJson'].listInteresT.map(
                                (el)=>(
                                    <option key={el.id} value={el.id} selected={valorCurso==el.id?true:false} >{el.name}</option>
                                )
                            )
                        }
                    </select>
                </>
            );
        }
    }
    render(){
        return this.renderList();
    }
}
export default function FormUpDate(props){
        const dateJson = React.useContext(ContextLogin);
        let valorCiudad = -1;
        const statusCiudad = () =>{
            dateJson['dateJson'].listCiudades.map(
                (el)=>{
                    props.dataUpDate.ciudad_idciudad.map((elC)=>{
                        if(elC==el.name){
                            valorCiudad = el.id;
                        }
                    });
                }
            )
        };   
        statusCiudad();
        let valorState = -1;
        const statusState = () =>{
            props.dataUpDate.estado_idestado.map((el)=>{
                if(el=="Contactado"){
                    valorState=1;
                    return;
                }else if(el=="Sin contactar"){
                    valorState=2;
                    return;
                }else if(el=="Cita"){
                    valorState=3;
                    return;
                }
            });
        }
        statusState();
        return(
            <div className="FormIngresoMain">
                <div className="FormIngreso">
                    <h2>ACTUALIZACION DE DATOS</h2>
                </div>
                <div className="FormIngreso">
                    <div className="FormIngresoLeftAndRight">
                        <div className="FormIngresoLeft">
                            <label htmlFor="idNombre">Nombre</label>
                            <input className="FormIngresoStyleComponents dataOut" type="text" id="idNombre" placeholder={props.dataUpDate.nombre}/>
                            <label htmlFor="idApellido">Apellido</label>
                            <input className="FormIngresoStyleComponents dataOut" type="text" id="idApellido" placeholder={props.dataUpDate.apellido}/>
                            <label htmlFor="idCorreo">Correo</label>
                            <input className="FormIngresoStyleComponents dataOut" type="email" id="idCorreo" placeholder={props.dataUpDate.correo}/>
                            <label htmlFor="idNumeroContacto">Numero de Contacto</label>
                            <input className="FormIngresoStyleComponents dataOut" type="number" id="idNumeroContacto" placeholder={props.dataUpDate.numero}/>
                        </div>
                        <div className="FormIngresoRight">
                            <div>
                                <RenderListInteres dataUpDate={props.dataUpDate} dateJson={dateJson}/>
                            </div>
                            <label htmlFor="idObservacion">Observacion</label>
                            <textarea id="idObservacion" className="dataOut" rows="5" cols="50">{props.dataUpDate.observacion}</textarea>
                            <label htmlFor="idCiudad">Ciudad</label>
                            <select className="FormIngresoStyleComponents dataOut" id="idCiudad">
                                <option key={0} value="0">Selccione</option>
                                {dateJson['dateJson'].listCiudades.map((el)=>(
                                    <option key={el.id} value={el.id} selected={valorCiudad==el.id?true:false} >{el.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <h3>Estado</h3>
                        <label htmlFor="idStatusContactado">Contactado</label>
                        <input type="radio" className="dataOut" style={styleRadio} id="idStatusContactado" name="estado" value="Contactado" defaultChecked={valorState==1?true:false}/>
                        <label htmlFor="idStatusSinContactar"> Sin Contactar</label>
                        <input type="radio" className="dataOut" style={styleRadio} id="idStatusSinContactar" name="estado" value="SinContactar" defaultChecked={valorState==2?true:false}/>
                        <label htmlFor="idStatusCita"> Cita</label>
                        <input type="radio" className="dataOut" style={styleRadio} id="idStatusCita" name="estado" value="Cita" defaultChecked={valorState==3?true:false}/>
                    </div>
                </div>
                <div className="FormIngreso">
                    <ChildModal setCloseParent={props.setCloseParent} dataUpDate={props.dataUpDate}/>
                </div>
            </div>
        );
}