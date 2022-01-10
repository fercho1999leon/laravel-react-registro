import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../../css/FormAddTyCStyle.css';
import ContextLogin from './ContextLogin';
const SxBtn = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '5px 20px',
    borderRadius: '10px',
    backgroundColor: '#22376D',
    color: 'white',
    marginTop: '20px'
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
function CustomizedSnackbars(props) {
    const [typeMsg, setTypeMsg] = React.useState(true);
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    return (
      <Stack spacing={2} direction="row">
        <Button sx={SxBtn} variant="contained" onClick={(e)=>{
            onClickAddCyT(props.state,props.id,handleClick,setTypeMsg);
        }}>
            AGREGAR
        </Button>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={typeMsg?"success":"error"} sx={{ width: '100%' }}>
            {typeMsg?'INGRESO CORRECTO':'ERROR AL INGRESAR'}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

const onClickAddCyT = (state,id,handleClick,setTypeMsg) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const configSate = state['configSate'];
    const setDateJson = state['setDateJson'];
    const dataForm = document.getElementsByClassName('dataOut');
    const typeInteres = dataForm[0].childNodes[0].checked?1:2;
    const name = dataForm[2].childNodes[1].childNodes[0].value;
    let archivoDatos={
        typeInteres,
        name,
        configSate,
        id,
    }
    archivoDatos = JSON.stringify(archivoDatos);
    fetch('/registro/addTyC',{
        headers:{
            'X-CSRF-TOKEN':token,
            'Content-Type':'application/json',
        },
        method: 'POST', 
        body: archivoDatos, 
    }).then(response => {
        return response.text();
    }).then(respuesta =>{
        try {
            const data = JSON.parse(respuesta);
            setDateJson(data);
            setTypeMsg(true);
            handleClick();
        } catch (error) {
            setTypeMsg(false);
            handleClick();
        }
    });
}
export default function FormAddTyC(props){
    const state = React.useContext(ContextLogin);
    return(
    <div className='ContentConponentAddTyC'>
        <h2>AGREGAR CARRERA O CURSO</h2>
        <div style={{
            marginTop: '20px'
        }}>
            <FormControl component="fieldset">
                <RadioGroup defaultValue="carrera" row name="row-radio-buttons-group">
                    <FormControlLabel value="carrera" control={<Radio className="dataOut"/>} label="Carrera" />
                    <FormControlLabel value="curso" control={<Radio className="dataOut"/>} label="Curso" />
                </RadioGroup>
            </FormControl>
        </div>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField className="dataOut" id="standard-basic" label="Ingrese Nombre" variant="standard" />
        </Box>
        <CustomizedSnackbars state={state} id={props.id}/>
    </div>
    );
}