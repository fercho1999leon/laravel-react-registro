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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BotonAlerta() {
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
              onClickGuardar(handleClick,setTypeMsg);
          }}>Guardar</Button>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={typeMsg?"success":"error"} sx={{ width: '100%' }}>
              {typeMsg?'INGRESO CORRECTO':'ERROR COMPLETE LOS CAMPOS'}
            </Alert>
          </Snackbar>
        </Stack>
    );
}

const onClickGuardar = (handleClick,setTypeMsg) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const arrayData = document.getElementsByClassName('dataNewUser');
    const nombre = arrayData[0];
    const correo = arrayData[1];
    const cedula = arrayData[2];
    const contrasena = arrayData[3];
    const confContrasena = arrayData[4];
    const rol = arrayData[5];
    console.log(arrayData);
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
export default function FormNewUser(){
    const [age, setAge] = React.useState(0);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const styleText = {
        width: '80%',
    }
    return (
        <>
            <FormControl component="fieldset">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 6, md: 12 }}
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        m: 1,textAlign: 'center',
                    }}
                >
                    <Grid item xs={12}>
                        <h3 style={{
                            color: 'var(--color-primary)'
                        }}>Registro de Usuarios en la plataforma</h3>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="outlined-basic" label="Nombre" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="outlined-basic" label="Correo" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="outlined-basic" label="Cedula" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="outlined-basic" label="Contraseña" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className='dataNewUser' sx={styleText} id="outlined-basic" label="Confirma Contraseña" variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
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
                    <Grid item xs={3}>
                        <div></div>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row" sx={{
                            justifyContent: 'center'
                        }}>
                            <BotonAlerta></BotonAlerta>
                        </Stack>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    );
}
