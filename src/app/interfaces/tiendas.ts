export interface Tienda{
    name: string;
    descripcion: string;
    celular: string;
    categorias: string[];
    provincia: string;
    distritos: string[];
    direccion: string;
    website: string;
    facebook: string;
    pago: string[];
    entrega: string[];
}
export interface TiendaEstado{
    id_cuestionario_mype: number;
    ruc: string;
    latitud: string;
    longitud: string;
    razon_social: string;
    nombre_comercial: string;
    es_agente: string;
    nombre_banco: string;
    vende_medicamento: string;
    horario_atencion: string;
    numero_documento: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
    telefono: string;
    celular: string;
    codigo_departamento: string;
    codigo_provincia: string;
    codigo_distrito: string;
    direccion: string;
    pago_tarjeta: string;
    pago_apps: string;
    flag: string;
    stock_productos: string;
    nombre_apps: string;
    departamento: string;
    provincia: string;
    distrito: string;
    vende_perecibles: string;
    vende_no_perecibles: string;
    vende_higiene: string;
    vende_aseo: string;
    acepta_yape: string;
    acepta_lukita: string;
    acepta_tunki: string;
    alimento_mascotas: string;
}