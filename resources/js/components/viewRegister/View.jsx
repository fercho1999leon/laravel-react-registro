import React from "react";
import VtnModalModel from "../VtnModalModel";
import FormIngreso from "./FormIngreso";
import Grid from "@mui/material/Grid";
import FormRegisterDate from "./FormRegisterDate";

export default function View (){
    return (
        <>

            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 6, sm: 6, md: 12 }}
                  sx={{
                      m: 0,textAlign: 'center',
                      paddingTop:'0px'
                  }}
            >
                <Grid item xs={12}>
                    <h2 style={{
                        color: 'var(--color-primary)',
                    }}>REGISTROS</h2>
                </Grid>
                <Grid item xs={4}>
                    <VtnModalModel title={"Nuevo Registro"} component={<FormIngreso></FormIngreso>}></VtnModalModel>
                </Grid>
                <Grid item xs={6} sm={6} md={12} sx={{
                    m: 'auto'
                }}>
                    <FormRegisterDate></FormRegisterDate>
                </Grid>
            </Grid>
        </>
    );
}
