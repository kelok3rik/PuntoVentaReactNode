import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showAlerta } from '../functions';

const showUsuarios = () => {
  const [showModal, setShowModal] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const [id, setId] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [NombreCompleto, setNombreCompleto] = useState('');
  const [Rol, setRol] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  const optionsUsers = [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Cajero', label: 'Cajero' },
  ]



  const handleDelete = (rowData) => {
    // Lógica para manejar la acción de "Eliminar"
    console.log("Eliminar usuario:", rowData);
  };



  useEffect(() => {

    getUsers();
  }, []);

  async function getUsers() {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });
  }

  const openModal = (op, id, nombreUsuario, Contraseña, NombreCompleto, Rol, title) => {
    setNombreUsuario('');
    setContraseña('');
    setNombreCompleto('');
    setRol('');
    setId('');
    if (op === 1) {
      setShowModal(true);
      setTitle('Registrar usuario');
      setOperation(1);
    }
    else if (op === 2) {
      console.log("Datos que llegan para Editar usuario:", id, nombreUsuario, Contraseña, NombreCompleto, Rol);
      setShowModal(true);
      setTitle('Editar usuario');
      setOperation(2);
      setId(id);
      setNombreUsuario(nombreUsuario);
      setContraseña(Contraseña);
      setNombreCompleto(NombreCompleto);
      setRol(Rol);

    }
    window.setTimeout(function () {
      document.getElementById('nombreUsuario').focus();
    }, 500);
  }

  const validar = () => {
    var parametros;
    var metodo;
    if (nombreUsuario.trim() === '') {
      showAlerta('El nombre es obligatorio', 'error');
    } else if (Contraseña.trim() === '') {
      showAlerta('La contraseña es obligatoria', 'error');
    }
    else if (NombreCompleto.trim() === '') {
      showAlerta('El nombre completo es obligatorio', 'error');
    }
    else if (Rol.toString().trim() === '') {
      showAlerta('El rol es obligatorio', 'error');
    }
    else {
      if (operation === 1) {
        parametros = { NombreUsuario: nombreUsuario.trim(), Contraseña: Contraseña.trim(), NombreCompleto: NombreCompleto.trim(), Rol: Rol.toString().trim() };
        metodo = 'POST';
      } else if (operation === 2) {
        parametros = { id: id, NombreUsuario: nombreUsuario.trim(), Contraseña: Contraseña.trim(), NombreCompleto: NombreCompleto.trim(), Rol: Rol.toString().trim() };
        metodo = 'PUT';
      }

      enviarSolicitud(parametros, metodo);

    }
  }

  const enviarSolicitud = async (parametros, metodo) => {
    await axios({ method: metodo, url: 'http://localhost:5000/users', data: parametros }).then((response) => {
      var tipo = response.data[0];
      var msj = response.data[1];
      console.log(response.data[0]);
      console.log(response.data[1]);
      console.log(response.data);
      showAlerta(msj, tipo);

      if (tipo == 'success') {
        document.getElementById('btnCerrar').click();
        getUsers();
      }
    }).catch((error) => {
      showAlerta('Error en la solicitud', 'error');
      console.log(error);
    });
  }


  //EL MUI DATATABLE LOGIC ABRE

  const columns = [

    { name: "IDUsuario", label: "IDUsuario", options: { display: 'excluded', filter: false } },
    { name: "NombreUsuario", label: "Usuario", filter: true },
    { name: "Contraseña", label: "Contraseña", filter: true },
    { name: "NombreCompleto", label: "Nombre", filter: true },
    { name: "Rol", label: "Rol" },
    {
      name: "Acciones",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <div>
              <button onClick={() => openModal(2, usuarios[tableMeta.rowIndex].UsuarioID, usuarios[tableMeta.rowIndex].NombreUsuario, usuarios[tableMeta.rowIndex].Contraseña, usuarios[tableMeta.rowIndex].NombreCompleto, usuarios[tableMeta.rowIndex].Rol)} className='btn btn-warning'>
                <i className='fa-solid fa-edit'></i>
              </button>
              <button onClick={() => handleDelete(usuarios[tableMeta.rowIndex])} className='btn btn-danger'>
                <i className='fa-solid fa-trash'></i>
              </button>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    download: false,
    print: false,
    filter: true,
    viewColumns: false,
    divider: true,
    responsive: "standard",
    rowsPerPage: 3,
    rowsPerPageOptions: [3, 6, 9],

    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "Filtros",
        reset: "Resetear",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/ocultar columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    },
  };


  //EL MUI DATATABLE LOGIC CIERRA

  return (
    <div className='App'>

      <div className='col-sm-6 offset-sm-3 col-md-4 offset-md-4'>
        <div className='d-grid mx-auto'>
          <button onClick={() => openModal(1)} className='btn btn-dark' >
            <i className='fa-solid fa-circle-plus'></i> Agregar
          </button>
        </div>
      </div>




      <div className="container-fluid-8">

        <div className="col-md-12 shadow-lg p-2 mb-5 bg-light rounded ">

          <MUIDataTable
            title={"Lista de usuarios"}
            data={usuarios}
            columns={columns}
            options={options}
          />

        </div>

      </div>





      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='hidden' id='id'></input>
          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
            <TextField id="nombreUsuario" label="Nombre Usuario"  value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} sx={{ width: '90%' }} />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-lock'></i></span>
            <TextField id="Contraseña" label="Contraseña"  value={Contraseña} onChange={(e) => setContraseña(e.target.value)} sx={{ width: '90%' }} />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
            <TextField id="NombreCompleto" label="Nombre Completo"  value={NombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} sx={{ width: '90%' }} />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-users'></i></span>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={optionsUsers}
              value={Rol}
              onChange={(event, newValue) => setRol(newValue.value)}
              renderInput={(params) => <TextField {...params} label="Selecciona un rol" sx={{ width: '367%' }} />}
            />
          </div>
          <div className='d-grid col-6 mx-auto'>
            <button onClick={() => validar()} className='btn btn-success'>
              <i className='fa-solid fa-save'></i> Guardar
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={() => setShowModal(false)}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>










    </div>
  );
}

export default showUsuarios;
