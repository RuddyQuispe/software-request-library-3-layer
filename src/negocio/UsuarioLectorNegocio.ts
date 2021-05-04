/**
 * Materia: Arquitectura de Software
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani
 * @version: 0.0.1
 * @since: 04-05-2021
 */

import { UsuarioLectorDatos } from "../datos/UsuarioLectorDatos";

export class UsuarioLectorNegocio {
    /**
     * Atributos
     */
    private usuarioLectorDatos: UsuarioLectorDatos;

    /**
     * Constructor
     */
    constructor() {
        this.usuarioLectorDatos = new UsuarioLectorDatos();
    }

    /**
     * Obtiene una lista de usuarios guardados en la BD
     * @returns Lista de usuarios lectores guardados en la BD
     */
    public async obtenerListaDeUsuariosLectores(): Promise<Array<{ ci: number, nombre: string, apellidos: string, email: string, telefono: string }>> {
        return await this.usuarioLectorDatos.obtenerListaUsuariosLectores();
    }

    /**
     * registra a usuario lector a la BD
     * @param ci : ci del usuario
     * @param nombre : nombre del usuario lector
     * @param apellidos : apellido del usuari lector
     * @param email : email del usuario
     * @param telefono : telefono del usuario (max 8)
     * @returns true si se registro correctamente; caso contrario false, si ocurrio un problema
     */
    public async registrarUsuarioLector(ci: number, nombre: string, apellidos: string, email: string, telefono: string): Promise<boolean> {
        this.usuarioLectorDatos.setCI(ci);
        this.usuarioLectorDatos.setNombre(nombre);
        this.usuarioLectorDatos.setApellidos(apellidos);
        this.usuarioLectorDatos.setEmail(email);
        this.usuarioLectorDatos.setTelefono(telefono);
        return await this.usuarioLectorDatos.registrarUsuarioLector();
    }

    /**
     * Este metodo obtiene los datos del usuario lector con el identificador (CI)
     * @param ciUsuarioLector : ci del usuario lector
     * @returns datos del usuario lector
     */
    public async obtenerDatosDeUsuarioLector(ciUsuarioLector: number): Promise<{ ci: number, nombre: string, apellidos: string, email: string, telefono: string }> {
        this.usuarioLectorDatos.setCI(ciUsuarioLector);
        return await this.usuarioLectorDatos.obtenerDatosUsuarioLector();
    }

    /**
     * Este metodo cambia los datos del usuario lector con el CI de identificador
     * @param ci : ci del usuario
     * @param nombre : nombre del usuario lector
     * @param apellidos : apellido del usuari lector
     * @param email : email del usuario
     * @param telefono : telefono del usuario (max 8)
     * @returns true si se modifico los datos, false si hubo problemas
     */
    public async modificarUsuarioLector(ci: number, nombre: string, apellidos: string, email: string, telefono: string): Promise<boolean> {
        this.usuarioLectorDatos.setCI(ci);
        this.usuarioLectorDatos.setNombre(nombre);
        this.usuarioLectorDatos.setApellidos(apellidos);
        this.usuarioLectorDatos.setEmail(email);
        this.usuarioLectorDatos.setTelefono(telefono);
        return await this.usuarioLectorDatos.modificarUsuarioLector();
    }
}