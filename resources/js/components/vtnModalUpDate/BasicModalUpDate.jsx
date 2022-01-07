import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormUpDate from './FormUpDate';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'var(--color-forms)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModalUpDate(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const styleSx = {
    backgroundColor: 'var(--color-primary)'
  }
  return (
    <div>
      <Button sx={styleSx} variant="contained" onClick={(e=>{handleOpen(e)})}>Up Date</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormUpDate dataUpDate={props.dataUpDate} setCloseParent={handleClose}></FormUpDate>
        </Box>
      </Modal>
    </div>
  );
}