import * as React from 'react';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius:'10px',
  boxShadow: 24,
  p: 4,
};

function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{width:'100%'}}>
      <h3 onClick={handleOpen}>{props.leabelBtn}</h3>
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
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
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
                            <TransitionsModal leabelBtn={props.notifications.length > 0 ? props.notifications[0].msg.length > 50 ? props.notifications[0].msg.substr(0, 50) + '...' : props.notifications[0].msg : null}/>
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
