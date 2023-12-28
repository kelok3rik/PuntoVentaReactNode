import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showAlerta } from '../functions';


const showProductos = () => {

  const [showModal, setShowModal] = useState(false);

  const [productos, setProductos] = useState([]);
  const [categoriasArray, setCategoriasArray] = useState([]);
  const [proveedoresArray, setProveedoresArray] = useState([]);
  const [id, setId] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [idProveedor, setIdProveedor] = useState('');
  const [ProductoNombre, setProductoNombre] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Precio, setPrecio] = useState('');
  const [CantidadStock, setCantidadStock] = useState('');
  const [Reorden, setReorden] = useState('');
  const [Categoria, setCategoria] = useState('');
  const [Proveedor, setProveedor] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  //





  useEffect(() => {
    getProducts();
  }, []);


  async function getProducts() {
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        console.log("Data total");
        console.log(data);

        // Crear un objeto para almacenar categorías únicas
        const categoriasUnicas = {};
        const proveedoresUnicos = {};

        // Recorrer los resultados y almacenar las categorías únicas en el objeto
        data.forEach((producto) => {
          categoriasUnicas[producto.CategoriaID] = producto.CategoriaNombre;
        });

        data.forEach((producto) => {
          proveedoresUnicos[producto.ProveedorID] = producto.ProveedorNombre;
        });

        // Obtener un array de objetos con las categorías únicas
        const categoriasArray = Object.entries(categoriasUnicas).map(([id, nombre]) => ({
          CategoriaID: id,
          CategoriaNombre: nombre
        }));

        const proveedoresArray = Object.entries(proveedoresUnicos).map(([id, nombre]) => ({
          ProveedorID: id,
          ProveedorNombre: nombre
        }));

        console.log("Array Filtrado categoria y proveedor");
        console.log(categoriasArray);
        console.log(proveedoresArray);
        setCategoriasArray(categoriasArray);
        setProveedoresArray(proveedoresArray);

      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  }

  const openModal = (op, id, ProductoNombre, Descripcion, Precio, CantidadStock, Reorden, Categoria, Proveedor, idCategoria, idProveedor, title) => {
    setProductoNombre('');
    setDescripcion('');
    setPrecio('');
    setCantidadStock('');
    setReorden('');
    setCategoria('');
    setProveedor('');
    setId('');
    setIdCategoria('');
    setIdProveedor('');




    if (op === 1) {
      setShowModal(true);
      setTitle('Registrar producto');
      setOperation(1);
    }
    else if (op === 2) {
      console.log("Datos que llegan para Editar producto:", id, ProductoNombre, Descripcion, Precio, CantidadStock, Reorden, Categoria, Proveedor);
      setShowModal(true);
      setTitle('Editar producto');
      setOperation(2);
      setId(id);
      setIdCategoria(idCategoria);
      setIdProveedor(idProveedor);
      setProductoNombre(ProductoNombre);
      setDescripcion(Descripcion);
      setPrecio(Precio);
      setCantidadStock(CantidadStock);
      setReorden(Reorden);
      setCategoria(Categoria)
      setProveedor(Proveedor);


    }
    window.setTimeout(function () {
      document.getElementById('nombreUsuario').focus();
    }, 500);
  }

  const validar = () => {
  

    if (ProductoNombre.trim() === '') {
      showAlerta('El nombre del producto es obligatorio', 'error');
    } else if (Descripcion.trim() === '') {
      showAlerta('La descripción del producto es obligatoria', 'error');
    } else if (Precio.toString().trim() === '') {
      showAlerta('El precio del producto es obligatorio', 'error');
    } else if (CantidadStock.toString().trim() === '') {
      showAlerta('La cantidad en stock es obligatoria', 'error');
    } else if (Reorden.toString().trim() === '') {
      showAlerta('La cantidad de reorden es obligatoria', 'error');
    } else if (Categoria.trim() === '') {
      showAlerta('La categoría es obligatoria', 'error');
    } else if (Proveedor.trim() === '') {
      showAlerta('El proveedor es obligatorio', 'error');
    } else {
      if (operation === 1) {
        parametros = {

          Nombre: ProductoNombre.trim(),
          Descripcion: Descripcion.trim(),
          Precio: Precio.toString().trim(),
          CantidadStock: CantidadStock.toString().trim(),
          Reorden: Reorden.toString().trim(),
          CategoriaID: idCategoria.toString().trim(),
          ProveedorID: idProveedor.toString().trim()

        };
        metodo = 'POST';
        enviarSolicitud(parametros, metodo);
      } else if (operation === 2) {
        parametros = {
          ProductoID: id,
          Nombre: ProductoNombre.trim(),
          Descripcion: Descripcion.trim(),
          Precio: Precio.toString().trim(),
          CantidadStock: CantidadStock.toString().trim(),
          Reorden: Reorden.toString().trim(),
          CategoriaID: idCategoria.toString().trim(),
          ProveedorID: idProveedor.toString().trim()

        };
        metodo = 'PUT';
        enviarSolicitud(parametros, metodo);
      }
    }
  };



  const enviarSolicitud = async (parametros, metodo) => {
    await axios({ method: metodo, url: 'http://localhost:5000/products', data: parametros }).then((response) => {
      var tipo = response.data[0];
      var msj = response.data[1];
      console.log(response.data[0]);
      console.log(response.data[1]);
      console.log(response.data);
      showAlerta(msj, tipo);

      if (tipo == 'success') {
        document.getElementById('btnCerrar').click();
        getProducts();
      }
    }).catch((error) => {
      showAlerta('Error en la solicitud', 'error');
      console.log(error);
    });
  }

  //EL MUI DATATABLE LOGIC ABRE

  const columns = [

    { name: "IDProducto", label: "IDProducto", options: { display: 'excluded', filter: false } },
    { name: "ProductoNombre", label: "Nombre", filter: true },
    { name: "Descripcion", label: "Descripcion", filter: true },
    { name: "Precio", label: "Precio", filter: true },
    { name: "CantidadStock", label: "Stock", filter: true },
    { name: "Reorden", label: "Reorden", filter: true },
    { name: "CategoriaNombre", label: "Categoria", filter: true },
    { name: "ProveedorNombre", label: "Proveedor", filter: true },
    {
      name: "Acciones",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <div>
              <button onClick={() => openModal(2, productos[tableMeta.rowIndex].IDProducto, productos[tableMeta.rowIndex].ProductoNombre, productos[tableMeta.rowIndex].Descripcion, productos[tableMeta.rowIndex].Precio, productos[tableMeta.rowIndex].CantidadStock, productos[tableMeta.rowIndex].Reorden, productos[tableMeta.rowIndex].Categoria, productos[tableMeta.rowIndex].Proveedor)} className='btn btn-warning'>
                <i className='fa-solid fa-edit'></i>
              </button>
              <button onClick={() => handleDelete(productos[tableMeta.rowIndex])} className='btn btn-danger'>
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
            title={"Lista de productos"}
            data={productos}
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
          <input type='hidden' id='idCategoria'></input>
          <input type='hidden' id='idProveedor'></input>

          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-address-card'></i></span>
            {/* <input type="text" id="nombreUsuario" className="form-control" placeholder="Nombre Producto" value={ProductoNombre} onChange={(e) => setProductoNombre(e.target.value)}></input> */}
            <TextField id="nombreUsuario" label="Nombre Producto" value={ProductoNombre} onChange={(e) => setProductoNombre(e.target.value)} sx={{ width: '90%' }} />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-address-card'></i></span>
            <TextField id="Descripcion" label="Descripcion" value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} sx={{ width: '90%' }} />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-lock'></i></span>
            <TextField id="Precio" label="Precio" type="number" InputLabelProps={{ shrink: true, }} value={Precio} onChange={(e) => setPrecio(e.target.value)} sx={{ width: '90%' }} />

          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-address-card'></i></span>
            <TextField id="CantidadStock" label="Cantidad en stock" type="number" InputLabelProps={{ shrink: true, }} value={CantidadStock} onChange={(e) => setCantidadStock(e.target.value)} sx={{ width: '90%' }} />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-address-card'></i></span>
            <TextField id="Reorden" label="Cantidad de reorden" type="number" InputLabelProps={{ shrink: true, }} value={Reorden} onChange={(e) => setReorden(e.target.value)} sx={{ width: '90%' }} />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-users'></i></span>
            <Autocomplete
              id="Categoria"
              options={categoriasArray}
              getOptionLabel={(option) => option.CategoriaNombre}
              value={categoriasArray.find((categoria) => categoria.CategoriaID === Categoria) || null}
              onChange={(event, newValue) => {
                setCategoria(newValue ? newValue.CategoriaID : '');
                setIdCategoria(newValue ? newValue.CategoriaID : '');
              }}
              renderInput={(params) => <TextField {...params} label="Selecciona una categoría" sx={{ width: '480%' }} />}
            />
          </div>

          <div className='input-group mb-3'>
            <span className='input-group-text'><i className='fa-solid fa-users'></i></span>
            <Autocomplete
              id="Proveedor"
              options={proveedoresArray}
              getOptionLabel={(option) => option.ProveedorNombre}
              value={proveedoresArray.find((proveedor) => proveedor.ProveedorID === Proveedor) || null}
              onChange={(event, newValue) => {
                setProveedor(newValue ? newValue.ProveedorID : '');
                setIdProveedor(newValue ? newValue.ProveedorID : '');
              }}
              renderInput={(params) => <TextField {...params} label="Selecciona un proveedor" sx={{ width: '480%' }} />}
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

export default showProductos;

