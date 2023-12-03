export interface Usuario {
    id: number | null | undefined;
    nombre: string;
    apellido: string;
    password: string;
    saldo: number | null;
    email: string | null;
}