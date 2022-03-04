import * as React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import '../../css/loginStyle.css';
import logoSPS from "../media/LOGO-SPS.svg";
const styleBX = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 100,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function loginDB(handleClose){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user = document.getElementById('user').value;
    const pass = document.getElementById('password').value;
    let archiveDates = {
        user,
        pass
    }
    archiveDates = JSON.stringify(archiveDates);
    fetch('/',{
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: archiveDates,
    })
    .then(res => {
        return res.text();
    })
    .then(dataJson => {
        document.open();
        document.write(dataJson);
        document.close();
        handleClose();
    }).catch((err)=>{
        handleClose();
        console.log(err);
    });
}
export default function Login() {
    return (
        <>
            <div className="BodyLogin">
                <div className="content-login content-left">
                    <img src={logoSPS} style={{ "width": "40%", "height": "200px" }}  alt={'logo'}/>
                    <p className="titulo">INSTITUTO SUPERIOR</p>
                    <p className="titulo">REY DAVID</p>
                    <p id="descripcion" style={{ fontSize: "90%", "margin": "0 5%", marginTop: "5%" }}>
                        Sistema de registro del Instituto Superior Tecnico Rey David
                    </p>
                </div>
                <div className="content-login content-right">
                    <header>
                        <h1 style={{ marginTop: "6%", fontSize: "160%" }}>Inicio de Sesión del Sistema ISTRED</h1>
                        <p style={{ fontSize: "80%" }}>Digital tus credenciales</p>
                    </header>
                    <main>
                        <TextField id="user" label="Cedula/Pasaporte" variant="standard" />
                        <TextField type="password" id="password" label="Password" variant="standard" />
                        <p id="messageError" style={{"color": "red", fontSize: "90%"}}/>
                        <BasicModal/>
                        <a id="btnAbrir" style={{ textDecoration: "none", alignSelf: "flex-start", marginLeft: "5%" }}>Recuperar Contraseña</a>
                    </main>
                </div>
            </div>
        </>
    );
}
function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <Stack spacing={2} direction="row">
            <Button sx={{bgcolor:'#22376D',m:1.5}} onClick={(e)=>{
                handleOpen();
                loginDB(handleClose);
            }} variant="contained">Iniciar Session</Button>
        </Stack>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleBX}>
            <CircularProgress />
          </Box>
        </Modal>
      </div>
    );
  }
if (document.getElementById('Login')) {
    ReactDOM.render(<Login />, document.getElementById('Login'));
}
