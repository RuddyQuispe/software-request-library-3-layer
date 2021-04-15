/**
 * Materia: Arquitectura de Software
 * Carrera: Ing. Informatica
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 14-04-2021
 */

import { QueryResult } from "pg";
import { Conexion } from "../database/Conexion";


export class CategoriaDatos {

    /**
     * Atributos
     */
    private id: number;
    private descripcion: string;
    private conexionDB: Conexion;

    /**
     * Constructor
     * @param id : ID de la Categoria
     * @param descripcion : descripcion de la Categoria
     */
    constructor(id?: number, descripcion?: string) {
        this.id = id || -1;
        this.descripcion = descripcion || "none";
        // patron singleton: conexion a la BD
        this.conexionDB = Conexion.getInstancia();
    }

    /**
     * Setters y Getters
     */
    public setId(id: number): void {
        this.id = id;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public getId(): number {
        return this.id;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    /**
     * obtiene una lista de categorias almacenadas en la BD
     * @returns Array<{number, string}> lista de categorias existentes | undefined si ocurrio un error en la consulta
     */
    public async obtenerListaCategoria(): Promise<Array<{ id: number, descripcion: string }> | undefined> {
        let resultado: QueryResult = await this.conexionDB.ejecutarConsultaSQL(`select * from categoria order by id`);
        return resultado.rows;
    }

    /**
     * obtener datos de categoria seleccionada
     * @param idCategoria : id categoria
     * @returns { id: number, descripcion: string } datos de categoria
     */
    public async obtenerDatosDeCategoria(idCategoria: number): Promise<{ id: number, descripcion: string }> {
        let categoriaResultado: QueryResult = await this.conexionDB.ejecutarConsultaSQL(`select id, descripcion from categoria where id=${idCategoria}`);
        return categoriaResultado.rows[0];
    }

    /**
     * modifica la descripcion (this.descripcion) de la categoria con id (this.id)
     * @returns true: si modifico categoria - false si hubo problemas a modificar
     */
    public async modificarCategoria(): Promise<boolean> {
        try {
            await this.conexionDB.ejecutarConsultaSQL(`update categoria set descripcion='${this.descripcion}' where id=${this.id}`);
            return true;
        } catch (error) {
            console.log("Error en metodo modificarCategoria", error);
            return false;
        }
    }

    /**
     * registrar a la BD la categoria
     * @returns true: si se registro correctamente - false: si hubo error al registrar y no se registro
     */
    public async registrarCategoria(): Promise<boolean> {
        try {
            let resultado: QueryResult | undefined = await this.conexionDB.ejecutarConsultaSQL(`insert into categoria(descripcion) values ('${this.descripcion}')`);
            return resultado !== undefined;
        } catch (error) {
            console.log("Error en metodo registrarCategoria", error);
            return false;
        }
    }
}