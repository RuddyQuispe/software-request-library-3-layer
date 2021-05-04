/**
 * Materia: Arquitectura de Software
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 04-05-2021
 */

import { QueryResult } from "pg";
import { Conexion } from "../database/Conexion";

export class UsuarioLectorDatos {

    /**
     * Atributos
     */
    private ci: number;
    private nombre: string;
    private apellidos: string;
    private email: string;
    private telefono: string; // 8 chars max
    /**
     * Conexion a la BD
     */
    private conexion: Conexion;

    /**
     * Constructor
     */
    constructor(ci?: number, nombre?: string, apellidos?: string, email?: string, telefono?: string) {
        this.ci = ci ?? 0;
        this.nombre = nombre ?? "none";
        this.apellidos = apellidos ?? "none";
        this.email = email ?? "none@none.none";
        this.telefono = telefono ?? "77777777";
        // singleton
        this.conexion = Conexion.getInstancia();
    }

    /**
     * Getters y Setters
     */
    public setCI(ci: number): void { this.ci = ci; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    public setApellidos(apellidos: string): void { this.apellidos = apellidos; }
    public setEmail(email: string): void { this.email = email; }
    public setTelefono(telefono: string): void { this.telefono = telefono; }

    public getCI(): number { return this.ci; }
    public getNombre(): string { return this.nombre; }
    public getApellidos(): string { return this.apellidos; }
    public getEmail(): string { return this.email; }
    public getTelefono(): string { return this.telefono; }

    /**
     * Registra un usuario lector a la BD
     * @returns true si se registro correctamente; caso contrario falsesi hubo problemas
     */
    public async registrarUsuarioLector(): Promise<boolean> {
        try {
            await this.conexion.ejecutarConsultaSQL(`insert into usuario_lector(ci, nombre, apellidos, email, telefono) values 
                     (${this.ci}, '${this.nombre}', '${this.apellidos}', '${this.email}', '${this.telefono}');`);
            return true;
        } catch (error) {
            console.log("Error en metodod registrarUsuarioLector", error);
            return false;
        }
    }

    /**
     * retorna una lista de usuarios lectores guardados en la BD
     * @returns lista de usuarios Array<JSON> 
     */
    public async obtenerListaUsuariosLectores(): Promise<Array<{ ci: number, nombre: string, apellidos: string, email: string, telefono: string }>> {
        let listaDeUsuarios: QueryResult = await this.conexion.ejecutarConsultaSQL(`select ci, nombre, apellidos, email, telefono from usuario_lector ul`);
        return listaDeUsuarios.rows;
    }

    /**
     * obtiene datos de un usuario lector guardado en la BD.
     * @returns {ci, nombre, apellidos, email, telefono} del usuario lector
     */
    public async obtenerDatosUsuarioLector(): Promise<{ ci: number, nombre: string, apellidos: string, email: string, telefono: string }> {
        let datosUsuarioLector: QueryResult = await this.conexion.ejecutarConsultaSQL(`select ci, nombre, apellidos, email, telefono from usuario_lector where ci=${this.ci}`);
        return datosUsuarioLector.rows[0];
    }

    /**
     * modifica los datos del usuario lector, en base a su CI, se cambia el nombre, apellido, email, y telefono
     * @returns true si se modifico al usuario correctamente, caso contrario false
     */
    public async modificarUsuarioLector(): Promise<boolean> {
        try {
            await this.conexion.ejecutarConsultaSQL(`update usuario_lector 
                     set nombre='${this.nombre}', apellidos='${this.apellidos}', email='${this.email}', telefono='${this.email}' 
                     where ci=${this.ci}`);
            return true;
        } catch (error) {
            console.log("Error en metodo modificarUsuarioLector", error);
            return false;
        }
    }
}