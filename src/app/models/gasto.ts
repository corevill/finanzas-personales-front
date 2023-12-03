export interface Gasto {
    id: number | null;
    descripcion: string;
    cantidad: number;
    fecha_gasto: string;
    categoria_id: number;
    tipo_gasto: boolean;
    usuario_id: number | null | undefined;
}