import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showAlerta } from '../functions';

const supabase = createClient("https://vncppionwaebafkldsxm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuY3BwaW9ud2FlYmFma2xkc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyNTIwODEsImV4cCI6MjAwODgyODA4MX0.w0rqb0Dq6fMe7tZC1rfU_YRyjpo8Dy8ly2npuN5Vt4g");

const showCountries = () => {
  const [countries, setCountries] = useState([]);
  const [id, setId] = useState('');
  const [name, setNombre] = useState('');
  const [title, setTitle] = useState('');


  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }


  const openModal = (op, id, nombre, title) => {
    setNombre('');
    setId('');
    if (op === 1) {
      setTitle('Registrar Producto');
    }
    else if (op === 2) {
      setTitle('Editar Producto');
      setId(id);
      setNombre(nombre);
    }
    window.setTimeout(function () {
      document.getElementById('nombre').focus();
    }, 500);
  }

  const validar = () => {
    var parametros;
    var metodo;
    if (name.trim() === '') {
      showAlerta('El nombre es obligatorio', 'error');
    } else {
      if (op === 1) {
        parametros = { name };
        metodo = 'POST';
      } else if (op === 2) {
        parametros = { id, name };
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
                  <tr><th>#</th><th>Nombre</th><th>Pan</th><th>Juan</th></tr>
                </thead>

                <tbody className='table-group-divisor'>
                  {countries.map((country, index) => (
                    <tr key={country.id}>
                      <td>{index + 1}</td>
                      <td>{country.name}</td>
                      <td>
                        <button onClick={() => openModal(2, country.id, country.name)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target="#modalCountries">
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
                <input type="text" id="nombre" className="form-control" placeholder="Nombre" value={name} onChange={(e) => setNombre(e.target.value)}></input>
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

export default showCountries;