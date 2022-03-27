import * as React from 'react';
import {motion} from 'framer-motion';
import Grid from '@mui/material/Grid';
import Notification from './Notification';
import data from '../rowsTable/notificationJson.json';

const colorList = [
    {id:1, color:'#6874CD'},
    {id:2, color:'#68BFCD'},
    {id:3, color:'#8768CD'},
    {id:4, color:'#B668CD'},
    {id:5, color:'#CD6893'},
    {id:6, color:'#CD6868'},
    {id:7, color:'#CDC868'},
    {id:8, color:'#CD9B68'},
];

const showNotify = (day,importData) =>{
    let arrayRows = [];
    // eslint-disable-next-line array-callback-return
    importData.map(el => {
        if (el.day === day) {
            arrayRows.push(el);
        }
    });
    return arrayRows;
}

const calculateColor = () => {
    return colorList[Math.floor(Math.random() * (7))].color;
}

export default function Rows (props){
    const [temp,setTemp]=React.useState([]);
    React.useEffect(()=>{
        setTemp(data);
    },[]);
    const variants={
        onStart:{
            backgroundColor:calculateColor(),
            textAlign:'center',
            borderRadius:'10px',
            minHeight:'150px',
            minWidth:'140px',
            padding:'5px',
            scale:1,
            transition:{
                duration:2
            }
        },
        onHover:{
            scale:1.06,
            transition: { duration: 0.5 },
        }
    }
    return(
        <>
            <motion.div
                variants={variants}
                initial={'onStart'}
                whileHover={'onHover'}
            >
                <Grid container spacing={0}>
                    <Grid item xs={12} >
                        <h2>{props.id}</h2>
                        <h2>{props.day}</h2>
                    </Grid>
                    <Notification notifications={showNotify(props.day, temp)}/>
                </Grid>
            </motion.div>
        </>
    );
}
