import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Rows from '../rowsTable/Rows';

const ItemStyle = {
  margin: '10px',
  textAlign: 'center',
  color:'#676565',
}

export default function TableModel(props) {
  /**
   * Props columns: [{ id: '*****', label: '*****', minWidth: ***** },{ id: 'name', label: 'Name', minWidth: 170 }]
   * Props rows: [{ column1, column2, column3 },{ column1, column2, column3 }]
   *
   */
  const page = 0;
  const rowsPerPage = 10;
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h1 style={ItemStyle}>{(new Date(props.dateChange.year,props.dateChange.month,15)).toString().split(' ')[1]}</h1>
          </Grid>
        </Grid>
      </Box>
      <TableContainer sx={{ maxHeight: '430px', minHeight: '200px' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, width:'inherit', textAlign:'center'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {props.columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} sx={{padding:'0.5%'}} align={column.align}>
                          {
                            value?<Rows notify={props.notify} day={value} id={(new Date(props.dateChange.year, props.dateChange.month, value)).toString().split(' ')[0]}/>:null
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} sm={10} md={54 / 5}>
          </Grid>
          <Grid item xs={2 / 4} sm={2 / 4} md={2 / 4}>
            <IconButton sx={ItemStyle}>
              <ArrowBackIosIcon onClick={(e) => {
                const temp = props.dateChange;
                if (props.dateChange.month >= 1) {
                  temp.month = props.dateChange.month - 1;
                } else {
                  temp.month = 11;
                  temp.year = props.dateChange.year - 1;
                }
                props.setDateChange({
                  year: temp.year,
                  month: temp.month,
                  day: 0,
                });
              }}/>
            </IconButton>
          </Grid>
          <Grid item xs={2 / 4} sm={2 / 4} md={2 / 4}>
            <IconButton sx={ItemStyle}>
              <ArrowForwardIosIcon onClick={(e)=>{
                const temp = props.dateChange;
                if(props.dateChange.month<11){
                  temp.month = props.dateChange.month+1;
                }else{
                  temp.month = 0;
                  temp.year = props.dateChange.year+1;
                }
                props.setDateChange({
                  year:temp.year,
                  month:temp.month,
                  day:0,
                });
              }}/>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
