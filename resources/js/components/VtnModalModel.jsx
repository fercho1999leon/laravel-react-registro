import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const btn = {
    fontSize: '14px',
    borderRadius: '10px',
    backgroundColor: '#22376D',
    border: 'solid 1px var(--color-primary)',
    color: 'white',
    "&:hover":{
      color: "var(--color-primary)",
      backgroundColor: 'white',
    }
};

export default function VtnModalModel(props) {
    /**
     * props component : se envia el componente a renderizar dentro de la ventana modal
     * props title : se envia el nombre del boton
     */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <Button sx={btn} variant="contained" onClick={handleOpen}>{props.title}</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {props.component}
            </Box>
        </Modal>
    </div>
  );
}