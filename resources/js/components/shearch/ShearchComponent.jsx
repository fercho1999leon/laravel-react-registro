import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import "../../../css/ShearchComponentStyle.css";
import ContextLogin from '../ContextLogin';
import shearch from './shearch.js';
const style = {
    backgroundColor: 'var(--color-primary)'
}
export default function ShearchComponent(props){
    const refTextShearch = React.useRef();
    const configSate = React.useContext(ContextLogin);
    return(
        <div className="shearch">
                <label htmlFor="idShearch">Buscar: </label>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField ref={refTextShearch} size="small" id="outlined-basic" label="Ingrese Nombre" variant="outlined" />
                </Box>
                <span></span>
                <Stack direction="row" spacing={2}>
                    <Button onClick={(e)=>shearch(e,refTextShearch,props.setData,props.setBandera,configSate['configSate'])} sx={style} variant="contained">
                        BUSCAR
                    </Button>
                </Stack>
            </div>
    );
}