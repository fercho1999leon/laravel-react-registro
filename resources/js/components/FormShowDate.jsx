import React, {useState } from 'react';
import EnhancedTable from './EnhancedTable';
import ShearchComponent from './shearch/ShearchComponent'
const style = {
    margin: 'auto',
    width:'98%',
    minWidth: '200px'
}
export default function FormShowDate(props){
    const [dataTable,setDataTable] = useState("");
    const [banderaUp,setBanderaUp] = useState(true);
    return(
        <div style={style}>
            <ShearchComponent setData={setDataTable} setBandera={setBanderaUp}/>
            <EnhancedTable data={dataTable} id={props.id} bandera={banderaUp} setData={setDataTable} setBandera={setBanderaUp}></EnhancedTable>
        </div>
    );
};
