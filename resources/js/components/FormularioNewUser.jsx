import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ContextLogin from './ContextLogin';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BotonAlerta(props) {
    const configSate = React.useContext(ContextLogin);
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
          <Button sx={styleBtn} variant="contained" onClick={(e)=>{
              onClickGuardar(configSate['configSate'],props.id,handleClick,setTypeMsg,props.insertDataRows,props.update);
          }}>Guardar</Button>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={typeMsg?"success":"error"} sx={{ width: '100%' }}>
              {typeMsg?'INGRESO CORRECTO':'ERROR COMPLETE LOS CAMPOS'}
            </Alert>
          </Snackbar>
        </Stack>
    );
}

const onClickGuardar = (configSate,id,handleClick,setTypeMsg,insertDataRows,update) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const form = document.querySelector('form');
    const valid = form.reportValidity();
    if(valid){
        const arrayData = document.getElementsByClassName('dataNewUser');
        const nombre = arrayData[0].childNodes[1].childNodes[0].value;
        const correo = arrayData[1].childNodes[1].childNodes[0].value;
        const cedula = arrayData[2].childNodes[1].childNodes[0].value;
        const contrasena = arrayData[3].childNodes[1].childNodes[0].value;
        const rol = arrayData[4].childNodes[1].value;
        let archivoDatos={
            nombre,
            correo,
            cedula,
            contrasena,
            rol,
            configSate,
            id,
        }
        archivoDatos = JSON.stringify(archivoDatos);
        const url = '/registro/'+(update?'updateUser':'addNewUser');
        fetch(url,{
            headers:{
                'X-CSRF-TOKEN':token,
                'Content-Type':'application/json'
            },
            method:'POST',
            body:archivoDatos,
        }).then(res =>{
            return res.text();
        }).then(respuesta =>{
            try {
                const state = JSON.parse(respuesta);
                if(state['status']){
                    setTypeMsg(true);
                    handleClick();
                    insertDataRows(state['data']);
                }
            } catch (error) {
                setTypeMsg(false);
                handleClick();
            }
        });
    }
}

const styleBtn = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '5px 20px',
    margin: '8px auto',
    borderRadius: '10px',
    backgroundColor: '#22376D',
    border: 'solid 2px var(--color-primary)',
    color: 'white',
    "&:hover":{
        backgroundColor: 'white',
        color: 'var(--color-primary)',
    }
};
export default function FormularioNewUser(props){
    /**
     * Recive como propiedades los campos del form
     * Recive propiedad update especifica si actualiza o se crea
     */

    const [age, setAge] = React.useState(props.rol?props.rol:0);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const styleText = {
        width: '80%',
    }
    return (
        <div>
            <FormControl component="fieldset" >
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 6, md: 12 }}
                    component="form"
                    autoComplete="off"
                    sx={{
                        m: 1,textAlign: 'center',
                    }}
                >
                    <Grid item xs={12}>
                        <h3 style={{
                            color: 'var(--color-primary)',
                            marginTop:'10px'
                        }}>Registro de Usuarios en la plataforma</h3>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="idName" label="Nombre" value={props.name?props.name:null} variant="outlined" required/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="idEmail" label="Correo" value={props.email?props.email:null} variant="outlined" required/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="idCi" label="Cedula" value={props.ci?props.ci:null} variant="outlined" type="number" required/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="idPass" label="Contraseña" variant="outlined" type="password" required/>
                    </Grid>
                    <Grid item xs={1}>
                        <div></div>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl sx={{minWidth: 120 }}>
                            <Select
                                className='dataNewUser'
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value={0}>
                                None
                            </MenuItem>
                            <MenuItem value={1}>Usuario</MenuItem>
                            <MenuItem value={2}>Consultor</MenuItem>
                            <MenuItem value={3}>Especial</MenuItem>
                            <MenuItem value={1000}>Administrador</MenuItem>
                            </Select>
                            <FormHelperText>Seleccione Rol</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        <div></div>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row" sx={{
                            justifyContent: 'center'
                        }}>
                            <BotonAlerta id={props.id} insertDataRows={props.insertDataRows} update={props.update}></BotonAlerta>
                        </Stack>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    );
}
