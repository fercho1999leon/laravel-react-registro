import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import BasicModalUpDate from '../vtnModalUpDate/BasicModalUpDate';
import ContextLogin from '../ContextLogin';
let dateJson;
function createData(fecha, nombre, correo, numero, observacion, estado_idestado, ciudad_idciudad, curso_idcurso, carrera_idcarrera) {
  return {
    fecha,
    nombre,
    correo,
    numero,
    observacion,
    estado_idestado,
    ciudad_idciudad,
    curso_idcurso,
    carrera_idcarrera
  };
}
const rows = [];
function translateData(idDate,opc){
  if(opc==1){
    return dateJson['dateJson'].estados.map((el)=>{
      if(el.id==idDate){
        return el.name;
      }
    });
  }else if(opc==2){
    return dateJson['dateJson'].listCiudades.map((el)=>{
      if(el.id==idDate){
        return el.name;
      }
    });
  }else if(opc==3){
    return dateJson['dateJson'].listInteresT.map((el)=>{
      if(el.id==idDate){
        return el.name;
      }
    });
  }else if(opc==4){
    return dateJson['dateJson'].listInteresC.map((el)=>{
      if(el.id==idDate){
        return el.name;
      }
    });
  }
}
function insertData(data){
  if(data.length>0){
    data.map((el)=>{
      const estado = translateData(el['estado_idestado'],1);
      const ciudad = translateData(el['ciudad_idciudad'],2);
      const curso = translateData(el['curso_idcurso'],3);
      const carrera = translateData(el['carrera_idcarrera'],4);
      rows.push(createData(el['updated_at'], el['nombre'], el['correo'], el['numero'], el['observacion'],estado, ciudad, curso, carrera));
    });
  }
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'fecha',
    numeric: false,
    disablePadding: true,
    label: 'Fecha',
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'correo',
    numeric: true,
    disablePadding: false,
    label: 'Correo',
  },
  {
    id: 'numero',
    numeric: false,
    disablePadding: false,
    label: 'Numero',
  },
  {
    id: 'observacion',
    numeric: false,
    disablePadding: false,
    label: 'Observacion',
  },
  {
    id: 'estado_idestado',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
  },
  {
    id: 'ciudad_idciudad',
    numeric: false,
    disablePadding: false,
    label: 'Ciudad',
  },
  {
    id: 'curso_idcurso',
    numeric: false,
    disablePadding: false,
    label: 'Curso',
  },
  {
    id: 'carrera_idcarrera',
    numeric: false,
    disablePadding: false,
    label: 'Carrera',
  },
  {
    id: 'idBtnUpdate',
    numeric: false,
    disablePadding: false,
    label: 'Actualizar',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Usuarios
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <span>
            <AlertDialog setBandera={props.setBandera} selected={props.selected} id={props.id} setSelected={props.setSelected} rows={rows} data={props.data} setData={props.setData}/>
          </span>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <span>
            <BasicMenu setData={props.setData} id={props.id} setBandera={props.setBandera}></BasicMenu>
          </span>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  dateJson = React.useContext(ContextLogin);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('fecha');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  React.useEffect(()=>{
      rows.splice(0, rows.length);
      insertData(props.data);
      props.setBandera(false);
      setSelected([]);
      setPage(0);
  },[props.bandera]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: 'auto'}}>
      <Paper sx={{ width: 'auto', mb: 2 }}>
        <EnhancedTableToolbar selected={selected} id={props.id} setSelected={setSelected} numSelected={selected.length} data={props.data} setData={props.setData} setBandera={props.setBandera}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 'auto', minHeight:'200px' }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.correo);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.correo}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                            onClick={(event) => handleClick(event, row.correo)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.fecha}
                      </TableCell>
                      <TableCell align="right">{row.nombre}</TableCell>
                      <TableCell align="right">{row.correo}</TableCell>
                      <TableCell align="right">{row.numero}</TableCell>
                      <TableCell align="right">{row.observacion}</TableCell>
                      <TableCell align="right">{row.estado_idestado}</TableCell>
                      <TableCell align="right">{row.ciudad_idciudad}</TableCell>
                      <TableCell align="right">{row.curso_idcurso}</TableCell>
                      <TableCell align="right">{row.carrera_idcarrera}</TableCell>
                      <TableCell align="right">{<BasicModalUpDate dataUpDate={row} id={props.id}></BasicModalUpDate>}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
function BasicMenu(props) {
  const id = props.id;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const config = React.useContext(ContextLogin);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e,parametro,configSate) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let archivoDatos = {
      parametro,
      configSate,
      id,
    }
    archivoDatos = JSON.stringify(archivoDatos);
    fetch('/registro/filter',{
      headers:{
        'X-CSRF-TOKEN':token,
        'Content-Type':'application/json',
      },
      method: 'POST',
      body: archivoDatos,
    })
    .then(res => {return res.text()})
    .then(response => {
        try {
          props.setData(JSON.parse(response));
          props.setBandera(true);
        } catch (error) {
          document.open();
          document.write(response);
          document.close();
        }
    })
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FilterListIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(e)=>handleClose(e,1,config['configSate'])}>Contactado</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e,2,config['configSate'])}>Sin contactar</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e,3,config['configSate'])}>Cita</MenuItem>
      </Menu>
    </div>
  );
}

function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [consulta, setConsulta] = React.useState({
    estadoText:0,
    estadoBTN:0
  });
  const configSate = React.useContext(ContextLogin);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e,configSate,id) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const parametro = props.selected;
    let newArray = props.rows;
    let archivoDatos = {
      parametro,
      configSate,
      id,
    }
    archivoDatos = JSON.stringify(archivoDatos);
    setConsulta({
      estadoText:1,
      estadoBTN:1
    });
    fetch('/registro/delect',{
      headers:{
        'X-CSRF-TOKEN':token,
        'Content-Type':'application/json',
      },
      method: 'POST',
      body: archivoDatos,
    })
    .then(res => {return res.text()})
    .then(response => {
      try {
        const dataJson = JSON.parse(response);
        if(dataJson['status']){
          setConsulta({
            estadoText:2,
            estadoBTN:2
          });
          props.selected.map((elS)=>{
              newArray=newArray.filter( (el) => el.correo != elS );
          })
          props.setData(newArray);
          props.setBandera(true);
          props.setSelected([]);
        }
      } catch (error) {
        document.open();
        document.write(response);
        document.close();
      }
    });
  };
  const cambiosText = () =>{
    if(consulta.estadoText==0){
      return(<h3>{props.selected.length} Usuario selecionado</h3>);
    }else if(consulta.estadoText==1){
      return(
        <>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </>
      );
    }else if(consulta.estadoText==2){
      return(
        <>
          <h3>Usuarios Eliminados</h3>
        </>
      );
    }
  }
  const cambiosBTN = ()=>{
    if(consulta.estadoBTN==0){
      return (
      <>
        <Button onClick={(e)=>{setOpen(false)}}>Cancelar</Button>
        <Button onClick={(e)=>{
          handleClose(e,configSate['configSate'],props.id);
        }} autoFocus>
          Eliminar
        </Button>
      </>);
    }else if(consulta.estadoBTN==1){
      return(<></>);
    }else if(consulta.estadoBTN==2){
      return(
        <Button onClick={(e)=>{setOpen(false)}}>Cerrar</Button>
      );
    }
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ELIMINAR"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {cambiosText()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {cambiosBTN()}
        </DialogActions>
      </Dialog>
    </div>
  );
}
