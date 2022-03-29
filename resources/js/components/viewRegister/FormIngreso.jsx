import * as React from 'react';
import {motion} from "framer-motion";
import { Component } from 'react';
import {useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import "../../../css/FormIngresoStyle.css";
import ContextLogin from "../ContextLogin";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const btn = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '5px 20px',
    margin: '8px auto',
    borderRadius: '10px',
    backgroundColor: '#22376D',
    border: 'solid 2px var(--color-primary)',
    color: 'white',
    "&:hover":{
      color: "var(--color-primary)",
    }
};
const styleRadio = {
    margin: "auto 10px"
}
const eventBtnGuardar = (e,refVtnModal,handleOpen,configSate,id) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const arrayData = document.getElementsByClassName('dataOut');
    let estadoUsuario;
    const typeInteres = arrayData[4].checked ? 1:2;
    if(arrayData[9].checked){estadoUsuario=1}
    else if(arrayData[10].checked){estadoUsuario=2}
    else if(arrayData[11].checked){estadoUsuario=3}
    let archivoDatos={
        nombre:arrayData[0].value,
        apellido:arrayData[1].value,
        correo:arrayData[2].value,
        numeroContacto:arrayData[3].value,
        typeInteres,
        interes:arrayData[6].selectedIndex,
        observacion:arrayData[7].value,
        ciudad:arrayData[8].selectedIndex,
        estado:estadoUsuario,
        configSate,
        id,
    }
    archivoDatos = JSON.stringify(archivoDatos);
    fetch('/registro/insert',{
        headers:{
            'X-CSRF-TOKEN':token,
            'Content-type':'application/json',
        },
        method: 'POST',
        body: archivoDatos,
    }).then(response => {
        return response.text();
    }).then(respuesta =>{
        try {
            respuesta = JSON.parse(respuesta);
            if(respuesta['code']==0 && respuesta!=""){
                refVtnModal.current.textContent="USUARIO CREADO CORRECTAMENTE";
            }else if(respuesta['code']==1){
                refVtnModal.current.textContent="Error en insert";
            }
        } catch (error) {
            document.open();
            document.write(respuesta);
            document.close();
        }
    });
    handleOpen();
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
            return(
                <>
                    <select className="FormIngresoStyleComponents dataOut" id="idInteres">
                        <option key={0} value="0">Selccione</option>
                        {
                            this.props.dateJson['dateJson'].listInteresC.map(
                                (el)=>(
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                )
                            )
                        }
                    </select>
                </>
            );
        }else if(this.state.nodoInteres==2){
            return(
                <>
                    <select className="FormIngresoStyleComponents dataOut" id="idInteres">
                        <option key={0} value="0">Selccione</option>
                        {
                            this.props.dateJson['dateJson'].listInteresT.map(
                                (el)=>(
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                )
                            )
                        }
                    </select>
                </>
            );
        }
    }
    render(){
        return (
            <>
                <h3>Interes</h3>
                <label htmlFor="idCarrera">Carrera</label>
                <input type="radio" className="dataOut" style={styleRadio} id="idCarrera" name="interes" value="carrera" onClick={this.eventRadioInteres} defaultChecked={this.selectChecked(1)}/>
                <label htmlFor="idCurso">Curso</label>
                <input type="radio" className="dataOut" style={styleRadio} id="idCurso" name="interes" value="curso" onClick={this.eventRadioInteres} defaultChecked={this.selectChecked(2)} />
                {this.renderList()}
            </>
        );
    }
}

const variants = {
    haidenLabel:{
        opacity:0,
        height:0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    showLabel:{
        opacity:1,
        height:'40px',
        transition:{
            duration:1
        }
    }
}

export default function FormIngreso(props){
    const dateJson = React.useContext(ContextLogin);
    const [showInputDate,setShowInputDate] = React.useState(false);
    return(
        <div className="FormIngresoMain">
            <div className="FormIngreso">
                <h2>INGRESO DE DATOS</h2>
            </div>
            <div className="FormIngreso">
                <div className="FormIngresoLeftAndRight">
                    <div className="FormIngresoLeft">
                        <label htmlFor="idNombre">Nombre</label>
                        <input className="FormIngresoStyleComponents dataOut" type="text" id="idNombre" placeholder="Ingrese dos nombres"/>
                        <label htmlFor="idApellido">Apellido</label>
                        <input className="FormIngresoStyleComponents dataOut" type="text" id="idApellido" placeholder="Ingrese dos apellidos"/>
                        <label htmlFor="idCorreo">Correo</label>
                        <input className="FormIngresoStyleComponents dataOut" type="email" id="idCorreo" placeholder="Ingrese correo electronico"/>
                        <label htmlFor="idNumeroContacto">Numero de Contacto</label>
                        <input className="FormIngresoStyleComponents dataOut" type="number" id="idNumeroContacto" placeholder="Ingrese telefono"/>
                    </div>
                    <div className="FormIngresoRight">
                        <div>
                            <RenderListInteres dateJson={dateJson}/>
                        </div>
                        <label htmlFor="idObservacion">Observacion</label>
                        <textarea id="idObservacion" className="dataOut" rows="5" cols="50"></textarea>
                        <label htmlFor="idCiudad">Ciudad</label>
                        <select className="FormIngresoStyleComponents dataOut" id="idCiudad">
                            <option key={0} value="0">Selccione</option>
                            {dateJson['dateJson'].listCiudades.map((el)=>(
                                <option key={el.id} value={el.id}>{el.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <h3>Estado</h3>
                    <label htmlFor="idStatusContactado">Contactado</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idStatusContactado" name="estado" value="contactado" onMouseUp={(e)=>{setShowInputDate(false)}} defaultChecked/>
                    <label htmlFor="idStatusSinContactar"> Sin Contactar</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idStatusSinContactar" name="estado" value="SinContactar" onMouseUp={(e)=>{setShowInputDate(false)}}/>
                    <label htmlFor="idStatusCita"> Cita</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idStatusCita" name="estado" value="Cita" onMouseUp={(e)=>{setShowInputDate(true)}}/>
                    {
                        showInputDate?
                            <motion.div
                                variants={variants}
                                initial={'haidenLabel'}
                                animate={showInputDate?'showLabel':'haidenLabel'}
                            >
                                <label htmlFor={'idAgendar'} style={{marginRight:'5px'}}>Agendar</label>
                                <input style={{color:'#787878',border: '1.5px solid #787878', borderRadius:'5px'}} type={'datetime-local'} className={'dataOut'} id={'idAgendar'} name="estado" required={true}/>
                            </motion.div>
                        :
                        null
                    }
                </div>
            </div>
            <div className="FormIngreso">
                <BasicModal id={props.id} handlerClick={eventBtnGuardar} configSate={dateJson['configSate']}></BasicModal>
            </div>
        </div>
    );
}
function BasicModal(props) {
    const refVtnModal = useRef();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    /*<ThemeProvider theme={theme}>
      <Button color="neutral" onClick={(e)=>{props.handlerClick(e,refVtnModal,handleOpen)}}>GUARDAR</Button>
    </ThemeProvider> va dentro del div*/
    return (
      <div>
        <Button sx={btn} onClick={(e)=>{props.handlerClick(e,refVtnModal,handleOpen,props.configSate,props.id)}}>GUARDAR</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              INFORMACION
            </Typography>
            <Typography id="modal-modal-description" ref={refVtnModal} sx={{ mt: 2 }} component="span">
              <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
              </Box>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
