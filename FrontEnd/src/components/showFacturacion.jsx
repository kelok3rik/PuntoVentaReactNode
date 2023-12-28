import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showAlerta } from '../functions';

const showFacturacion = () => {

    return (
        <div>
            <h1>Facturación</h1>
        </div>
    );
}

export default showFacturacion;