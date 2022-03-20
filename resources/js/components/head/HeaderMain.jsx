import * as React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const styleBtn = {
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

const cerrarSession = () =>{
    fetch('/logout',{
        method: 'GET',
    }).then(res => {return res.text()})
        .then(respuesta => {
            document.open();
            document.write(respuesta);
            document.close();

        });
}

export default function HeaderMain (props){
    return(
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={(e)=>{
                            props.openNav?props.setOpenNav(false):props.setOpenNav(true);
                        }}
                    >
                        {props.openNav?
                            <MenuIcon sx={{
                                color: "#22376D",
                            }}/>
                            :
                            <CloseRoundedIcon sx={{
                                color:"#22376D",
                            }}/>
                        }
                    </IconButton>
                </Toolbar>
                <Stack direction="row" spacing={2} sx={{
                    marginRight:2
                }}>
                    <Button sx={styleBtn} variant="contained" onClick={(e)=>{
                        cerrarSession();
                    }}>Cerrar Session</Button>
                </Stack>
            </Grid>
        </>
    );
}
