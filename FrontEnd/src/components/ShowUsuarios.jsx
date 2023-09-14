import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showAlerta } from '../functions';

// const supabase = createClient("https://vncppionwaebafkldsxm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuY3BwaW9ud2FlYmFma2xkc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyNTIwODEsImV4cCI6MjAwODgyODA4MX0.w0rqb0Dq6fMe7tZC1rfU_YRyjpo8Dy8ly2npuN5Vt4g");

const showUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [id, setId] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [NombreCompleto, setNombreCompleto] = useState('');
  const [Rol, setRol] = useState('');
  const [title, setTitle] = useState('');



  useEffect(() => {
    //getCountries();
    getUsers();
  }, []);


  async function getUsers(){
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
 
  const openModal = (op, id, nombreUsuario,Contraseña,NombreCompleto,Rol, title) => {
    setNombreUsuario('');
    setContraseña('');
    setNombreCompleto('');
    setRol('');
    setId('');

    if (op === 1) {
      setTitle('Registrar usuario');
    }
    else if (op === 2) {
      setTitle('Editar usuario');
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
    } else {
      if (op === 1) {
        parametros = { nombreUsuario };
        metodo = 'POST';
      } else if (op === 2) {
        parametros = { id, nombreUsuario };
        metodo = 'PUT';
      }
      guardar(parametros, metodo);
    }
  }

  return (
    <div className='App'>
      
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-4'>
            <div className='d-grid mx-auto'>
              <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalCountries'>
                <i className='fa-solid fa-circle-plus'></i> Agregar
              </button>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr><th>#</th><th>Usuario</th><th>Contraseña</th><th>Nombre</th><th>Rol</th></tr>
                </thead>

                <tbody className='table-group-divisor'>
                  {usuarios.map((usuario, index) => (
                    <tr key={usuario.UsuarioID}>
                      <td>{index + 1}</td>
                      <td>{usuario.NombreUsuario}</td>
                      <td>{usuario.Contraseña}</td>
                      <td>{usuario.NombreCompleto}</td>
                      <td>{usuario.Rol}</td>
                      <td>
                        <button onClick={() => openModal(2, usuario.UsuarioID, usuario.NombreUsuario, usuario.Contraseña, usuario.NombreCompleto,  usuario.Rol)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target="#modalCountries">
                          <i className='fa-solid fa-edit'></i>
                        </button>
                      </td>
                      <td>
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
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-address-card'></i></span>
                <input type="text" id="nombreUsuario" className="form-control" placeholder="Nombre Usuario" value={nombreUsuario} onChange={(e) => setNombre(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-lock'></i></span>
                <input type="text" id="Contraseña" className="form-control" placeholder="Contraseña" value={Contraseña} onChange={(e) => setContraseña(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-signature'></i></span>
                <input type="text" id="NombreCompleto" className="form-control" placeholder="Nombre completo" value={NombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-users'></i></span>
                <input type="text" id="Rol" className="form-control" placeholder="Rol" value={Rol} onChange={(e) => setRol(e.target.value)}></input>
              </div>
              <div className='d-grid col-6 mx-auto'>
                <button className='btn btn-success'>
                  <i className='fa-solid fa-save'></i> Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
            </div>

          </div>
        </div>
      </div>


    </div>
  );
}

export default showUsuarios;