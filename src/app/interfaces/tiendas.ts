export interface Tienda{
    name: string;
    descripcion: string;
    telefono: string;
    celular: string;
    categorias: string[];
    provincia: string;
    distritos: string[];
    direccion: string;
    website: string;
    facebook: string;
    pagos: string[];
    entregas: string[];
    latitud: string;
    longitud: string;
    direccion_gmap: string;
    nombre_contacto: string;
    correo: string;
    estado: string;
}
export interface TiendaAdmin{
    name: string;
    descripcion: string;
    telefono: string;
    celular: string;
    categorias: string[];
    provincia: string;
    distritos: string[];
    direccion: string;
    website: string;
    facebook: string;
    pagos: string[];
    entregas: string[];
    latitud: string;
    longitud: string;
    address: string;
    nombre_contacto: string;
    correo: string;
}