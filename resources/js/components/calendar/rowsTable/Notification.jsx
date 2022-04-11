import * as React from 'react';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  border: '1px solid #000',
  backgroundColor: 'white',
  borderRadius:'10px',
  boxShadow: 24,
  p: 4,
  overflow:'scroll',
  overflowY:'auto',
  overflowX:'hidden',
  maxHeight:'400px'
};

const removeNotify = (id,setNotify,notify) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    fetch('/remove/notify',{
        headers:{
            'X-CSRF-TOKEN':token,
            'Content-type':'application/json',
        },
        method: 'POST',
        body: JSON.stringify({id}),
    }).then(response => {
        return response.text();
    }).then(respuesta =>{
        try {
            respuesta = JSON.parse(respuesta);
            const newArray = notify.filter( (el) => el.id !== id);
            setNotify(newArray);
        } catch (error) {
            document.open();
            document.write(respuesta);
            document.close();
        }
    });

}

const formatNofify = (id,nombre,correo,msg,time_data,setNotify,notify) =>{
    return(
        <div key={id} style={{
            border: '1.5px solid var(--color-primary)',
            borderRadius:'10px',
            marginTop:'5px',
            marginBottom:'5px',
        }}>
            <Grid content>
                <Grid item xs={12}>
                    <Toolbar>
                        <IconButton
                            sx={{
                                fontSize:'1.1rem',
                                padding: '5px 10px',
                                margin:'0'
                            }}
                            onClick={(e)=>{
                                removeNotify(id,setNotify,notify);
                            }}
                        >
                            x
                        </IconButton>
                    </Toolbar>
                </Grid>
                <Grid item xs={12}>
                    <h3>Nombre: {nombre}</h3>
                </Grid>
                <Grid item xs={12}>
                    <h4>Correo: {correo}</h4>
                </Grid>
                <Grid item xs={12}>
                    <textarea rows="5" style={{width:'90%',margin:'5px', border:'none'}} disabled={true}>{msg}</textarea>
                </Grid>
                <Grid item xs={10}>
                    <h5>Hora: {time_data}</h5>
                </Grid>

            </Grid>
        </div>
    );
}

function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{width:'100%'}}>
      <h4 onClick={handleOpen}>{props.leabelBtn}</h4>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
              {props.notifications.map((el,index)=>(formatNofify(el.id,el.nombre,el.correo,el.observacion,el.time_data,props.setNotify,props.notify)))}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default function Notification(props){
    return (
        <>
            {
                props.notifications.length>0?
                    <>
                        <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',minHeight:'30px', maxHeight:'80px',cursor: 'pointer', width:'100px',borderRadius:'10px', backgroundColor:'#6C64A0', transition: 'background-color 0.5s ease-out 0s', color:'white', '&:hover':{backgroundColor:'#5FBFAF'}}}>
                            <TransitionsModal notify={props.notify} setNotify={props.setNotify} notifications={props.notifications} leabelBtn={props.notifications.length > 0 ? props.notifications[0].observacion.length > 50 ? props.notifications[0].observacion.substr(0, 50) + '...' : props.notifications[0].observacion : null}/>
                        </Grid>
                        <Grid item xs={12}>
                            <h3>{props.notifications?props.notifications.length>1?'+'+(props.notifications.length-1):null:null}</h3>
                        </Grid>
                    </>
                :
                null
            }

        </>
    );
}
