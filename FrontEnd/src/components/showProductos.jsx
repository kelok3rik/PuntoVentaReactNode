import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showAlerta } from '../functions';


const showProductos = () => {
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
      setTitle('Registrar producto');
      setOperation(1);
    }
    else if (op === 2) {
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
    var parametros;
    var metodo;
    if (ProductoNombre.trim() === '') {
      showAlerta('El nombre del producto es obligatorio', 'error');
    } else if (Descripcion.trim() === '') {
      showAlerta('La descripción del producto es obligatoria', 'error');
    } else if (Precio.trim() === '') {
      showAlerta('El precio del producto es obligatorio', 'error');
    } else if (CantidadStock.trim() === '') {
      showAlerta('La cantidad en stock es obligatoria', 'error');
    } else if (Reorden.trim() === '') {
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
          Precio: Precio.trim(),
          CantidadStock: CantidadStock.trim(),
          Reorden: Reorden.trim(),
          CategoriaID: idCategoria.trim(),
          ProveedorID: idProveedor.trim()
         
        };
        metodo = 'POST';
        enviarSolicitud(parametros, metodo);
      } else if (operation === 2) {
        parametros = {
          id: id,
          Nombre: ProductoNombre.trim(),
          Descripcion: Descripcion.trim(),
          Precio: Precio.trim(),
          CantidadStock: CantidadStock.trim(),
          Reorden: Reorden.trim(),
          CategoriaID: idCategoria.trim(),
          ProveedorID: idProveedor.trim()

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

  return (
    <div className='App'>
      <div className='row mt-3'>
        <div className='col-sm-6 offset-sm-3 col-md-4 offset-md-4'>
          <div className='d-grid mx-auto'>
            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalCountries'>
              <i className='fa-solid fa-circle-plus'></i> Agregar
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid p-5 ">
        <div className="col-md-12 shadow-lg p-2 mb-5 bg-light rounded ">
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Reorden</th>
                  <th>Categoría</th>
                  <th>Proveedor</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody className='table-group-divisor'>
                {productos.map((producto, index) => (
                  <tr key={producto.ProductoID}>
                    <td>{producto.ProductoNombre}</td>
                    <td>{producto.Descripcion}</td>
                    <td>{producto.Precio}</td>
                    <td>{producto.CantidadStock}</td>
                    <td>{producto.Reorden}</td>
                    <td>{producto.CategoriaNombre}</td>
                    <td>{producto.ProveedorNombre}</td>
                    <td>
                      <button onClick={() => openModal(2, producto.ProductoID, producto.ProductoNombre, producto.Descripcion, producto.Precio, producto.CantidadStock, producto.Reorden, producto.CategoriaNombre, producto.ProveedorNombre)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target="#modalCountries">
                        <i className='fa-solid fa-edit'></i>
                      </button>
                      <button className='btn btn-danger'>
                        <i className='fa-solid fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id='modalCountries' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>


              <input type='hidden' id='id'></input>
              <input type='hidden' id='idCategoria' ></input>
              <input type='hidden' id='idProveedor'></input>

              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-address-card'></i></span>
                <input type="text" id="nombreUsuario" className="form-control" placeholder="Nombre Producto" value={ProductoNombre} onChange={(e) => setProductoNombre(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-lock'></i></span>
                <input type="text" id="Contraseña" className="form-control" placeholder="Descripción" value={Descripcion} onChange={(e) => setDescripcion(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-signature'></i></span>
                <input type="text" id="NombreCompleto" className="form-control" placeholder="Precio" value={Precio} onChange={(e) => setPrecio(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-users'></i></span>
                <input type="text" id="Rol" className="form-control" placeholder="Cantidad en Stock" value={CantidadStock} onChange={(e) => setCantidadStock(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-users'></i></span>
                <input type="text" id="Reorden" className="form-control" placeholder="Cantidad de Reorden" value={Reorden} onChange={(e) => setReorden(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-users'></i></span>
                <select
                  id="Categoria" className="form-select" value={Categoria} onChange={(e) => { setCategoria(e.target.value); setIdCategoria(e.target.value)}}
                >
                  <option value={""}>Selecciona una categoria</option> {/* Opción inicial */}
                  {categoriasArray.map((producto, index) => (
                    <option key={producto.CategoriaID} value={producto.CategoriaID} text={producto.CategoriaNombre}>
                      {producto.CategoriaNombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-users'></i></span>
                <select
                  id="Proveedor"
                  className="form-select"
                  value={Proveedor}
                  onChange={(e) => { setProveedor(e.target.value); setIdProveedor(e.target.value)}}
                >
                  <option value={""}>Selecciona un proveedor</option> {/* Opción inicial */}
                  {proveedoresArray.map((proveedor, index) => (
                    <option key={proveedor.ProveedorID} value={proveedor.ProveedorID}>
                      {proveedor.ProveedorNombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => validar()} className='btn btn-success'>
                  <i className='fa-solid fa-save'></i> Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default showProductos;

