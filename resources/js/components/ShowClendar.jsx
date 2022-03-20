import * as React from 'react';
import TableModel from './calendar/bodyCalendar/TableModel';

const columns = [
    { id: 'Mon', label: 'LUNES', minWidth: '6rem'},
    { id: 'Tue', label: 'MARTES', minWidth: '6rem'},
    { id: 'Wed', label: 'MIERCOLES', minWidth: '6rem'},
    { id: 'Thu', label: 'JUEVES', minWidth: '6rem'},
    { id: 'Fri', label: 'VIERNES', minWidth: '6rem'},
    { id: 'Sat', label: 'SABADO', minWidth: '6rem'},
    { id: 'Sun', label: 'DOMINGO', minWidth: '6rem'},
];

function createData(arreglo) {
    return {
        Mon:arreglo.length>0?arreglo[0]:0,
        Tue:arreglo.length>1?arreglo[1]:0,
        Wed:arreglo.length>2?arreglo[2]:0,
        Thu:arreglo.length>3?arreglo[3]:0,
        Fri:arreglo.length>4?arreglo[4]:0,
        Sat:arreglo.length>5?arreglo[5]:0,
        Sun:arreglo.length>6?arreglo[6]:0,
    };
}

function importData(setRows,dateChange){
    const data = [];
    let control = 1;
    let start = true;
    let bandera = 0;
    for(let i=1;i<=6;i++){
        let arrDay = [];
        for(let j=control;j<=(i*7)-bandera;j++){
            control = j;
            const temp = new Date(dateChange.year,dateChange.month,control);
            if(start){
                // eslint-disable-next-line no-loop-func,array-callback-return
                columns.map(el =>{
                    if(!(temp.toString().split(' ')[0]===el.id)){
                        if(start){
                            arrDay.push(null);
                            bandera++;
                        }
                    }else if(temp.toString().split(' ')[0]===el.id){
                        arrDay.push(temp.getMonth()===dateChange.month?temp.getDate():null);
                        start=false;
                    }
                });
            }else{
                arrDay.push(temp.getMonth()===dateChange.month?temp.getDate():null);
            }

        }
        console.log(control);
        control++;
        data.push(createData(arrDay));
    }
    setRows(data);
}

export default function ShowClendar() {
    const [rows,setRows] = React.useState([]);
    const [dateChange,setDateChange] = React.useState({
        year:new Date(Date.now()).getFullYear(),
        month:new Date(Date.now()).getMonth(),
        day:0,
    });
    React.useEffect(()=>{
        importData(setRows,dateChange);
    },[dateChange]);
    return (
        <>
            <TableModel key={1} columns={columns} rows={rows} setDateChange={setDateChange} dateChange={dateChange}/>
        </>
    );
}
