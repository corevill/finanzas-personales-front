export interface Ingreso {
    id: number | null;
    descripcion: string;
    fecha_ingreso: string;
    cantidad: number;
    usuario_id: number | null | undefined;
}