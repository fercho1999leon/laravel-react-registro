import * as React from 'react';
import Grid from '@mui/material/Grid';
import Edit from '@mui/icons-material/Edit';
import TableModel from './TableModel';
import ContextLogin from './ContextLogin';
import VtnModalModel from './VtnModalModel';
import FormularioNewUser from "../components/FormularioNewUser";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
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

function VtnModalEdit(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
        <IconButton onClick={handleOpen}>
            <Edit />
        </IconButton>
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
    </>
  );
}

function createData(ci, name, rol, action) {
    return { ci, name, rol, action };
}
const columnsModel = [
    { id: 'ci', label: 'Cedula', minWidth: '10%' },
    { id: 'name', label: 'Nombre', minWidth: '10%' },
    { id: 'rol', label: 'Rol', minWidth: '10%' },
    { id: 'action', label: 'Edicion', minWidth: '10%' }
];
const importData = (setRows,configSate,id,insertDataRows) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let archivoDatos={
        configSate,
        id,
    }
    archivoDatos = JSON.stringify(archivoDatos);
    fetch('/registro/users',{
        headers:{
            'X-CSRF-TOKEN':token,
            'Content-Type':'application/json',
        },
        method:'POST',
        body:archivoDatos,
    }).then(res => {
        return res.text();
    }).then(res =>{
        try {
            const data = JSON.parse(res);
            insertDataRows(data);
        } catch (error) {
            document.open();
            document.write(res);
            document.close();
        }
    });

}

const delectUser = (configSate,id,insertDataRows,correo) =>{
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let archivoDatos={
        correo,
        configSate,
        id,
    }
    archivoDatos = JSON.stringify(archivoDatos);
    fetch('/registro/delectUser',{
        headers:{
            'X-CSRF-TOKEN':token,
            'Content-Type':'application/json',
        },
        method:'POST',
        body:archivoDatos,
    }).then(res => {
        return res.text();
    }).then(res =>{
        try {
            const data = JSON.parse(res);
            insertDataRows(data);
        } catch (error) {
            document.open();
            document.write(res);
            document.close();
        }
    });
}
export default function FormNewUser(props){
    const [rows,setRows] = React.useState([]);
    const configSate = React.useContext(ContextLogin);
    const insertDataRows = (data) =>{
        const arrayData = [];
        data.map((el)=>{
            let valueRol;
            switch (el['rol']){
                case 1:
                    valueRol = 'Usuario';
                    break;
                case 2:
                    valueRol = 'Consultor';
                    break;
                case 3:
                    valueRol = 'Especial';
                    break;
                case 1000:
                    valueRol = 'Administrador';
                    break;
            }
            arrayData.push(createData(el['ci'],el['name'],valueRol,
                <>
                    <VtnModalEdit component={<FormularioNewUser update={true} insertDataRows={insertDataRows} name={el['name']} email={el['email']} ci={el['ci']} rol={el['rol']} />} />
                    <IconButton onClick={(e)=>{
                        delectUser(configSate['configSate'],props.id,insertDataRows,el['email']);
                    }}>
                        <DeleteIcon/>
                    </IconButton>
                </>
            ))
        });
        setRows(arrayData);
    }
    React.useEffect(()=>{
        importData(setRows,configSate['configSate'],props.id,insertDataRows);
    },[]);
    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 6, md: 12 }}
                sx={{
                    m: 1,textAlign: 'center',
                }}
            > 
                <Grid item xs={12}>
                    <h2 style={{
                            color: 'var(--color-primary)',
                            marginTop:'10px'
                    }}>Usuarios de la plataforma</h2>
                </Grid>
                <Grid item xs={4}>
                    <VtnModalModel title={'NUEVO USUARIO'} component={<FormularioNewUser update={false} insertDataRows={insertDataRows} ></FormularioNewUser>}></VtnModalModel>
                </Grid>
                <Grid item xs={11} sx={{
                    m: 'auto'
                }}>
                    <TableModel  columns={columnsModel} rows={rows} xs={11}></TableModel>
                </Grid>
            </Grid>
        </>
    );
}