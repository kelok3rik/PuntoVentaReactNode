import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showAlerta } from '../functions';

const NavBar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">PUNTO DE VENTA</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Inicio</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Mantenimientos
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/mantenimientoCategoria">Categoría</a></li>
                                <li><a className="dropdown-item" href="/showUsuarios">Usuarios</a></li>
                                <li><a className="dropdown-item" href="/showProductos">Productos</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/showFacturacion">Ventas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/ordenar">Inventario</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Nombre del Usuario</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Cerrar Sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;