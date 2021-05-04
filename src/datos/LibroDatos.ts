/**
 * Materia: Arquitectura de Software
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 03-05-2021
 */

import { QueryResult } from "pg";
import { Conexion } from "../database/Conexion";

export class LibroDatos {
    /**
     * Atributos
     */
    private codigo: number;
    private autor: string;
    private titulo: string;
    private descripcion: string;
    private edicion: string; // max lenght = 5
    private stock: number;
    private estado: boolean;
    private idCategoria: number;
    /**
     * Cobexion a la BD
     */
    private conexionDatabase: Conexion;

    constructor(codigo?: number, autor?: string, titulo?: string, descripcion?: string, edicion?: string, stock?: number, estado?: boolean, idCategoria?: number) {
        this.codigo = codigo ? codigo : 0;
        this.autor = autor ? autor : "sin autor";
        this.titulo = titulo ? titulo : "sin titulo";
        this.descripcion = descripcion ? descripcion : "no hay descripción";
        this.edicion = edicion ? edicion : "sin edicion";
        this.stock = stock ? stock : 0;
        this.estado = estado ? estado : false;
        this.idCategoria = idCategoria ? idCategoria : 0;
        this.conexionDatabase = Conexion.getInstancia();
    }

    /**
     * Setters y Getters
     */

    public setCodigo(codigo: number): void {
        this.codigo = codigo;
    }

    public setAutor(author: string): void {
        this.autor = author;
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public setEdicion(edicion: string): void {
        this.edicion = edicion;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }

    public setEstado(estado: boolean): void {
        this.estado = estado;
    }

    public setIdCategoria(idCategoria: number): void {
        this.idCategoria = idCategoria;
    }

    public getCodigo(): number {
        return this.codigo;
    }

    public getAutor(): string {
        return this.autor;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getEdicion(): string {
        return this.edicion;
    }

    public getStock(): number {
        return this.stock;
    }

    public getEstado(): boolean {
        return this.estado;
    }

    public getIdCategoria(): number {
        return this.idCategoria;
    }

    /**
     * Registra un nuevo libro
     * @returns true: si se registro correctamente, false si no lo registro (hubo errores)
     */
    public async registrarLibro(): Promise<boolean> {
        let resultado = await this.conexionDatabase.ejecutarConsultaSQL(`insert into libro(autor, titulo, descripcion, stock, estado, edicion, id_categoria) values ('${this.autor}', '${this.titulo}', '${this.descripcion}', ${this.stock}, true, '${this.edicion}', ${this.idCategoria}) returning codigo`);
        return typeof resultado.rows[0].codigo === 'number';
    }

    /**
     * Obtiene la lista de libros guradado en la BD, sin importar si estado o alguna caracteristica. Todos los libros
     * @returns Array (lista de libros existentes)
     */
    public async obtenerListaLibros(): Promise<Array<{ codigo: number, autor: string, titulo: string, descripcion: string, edicion: string, stock: number, estado: boolean, descripcion_categoria: string }>> {
        let resultadoLista: QueryResult = await this.conexionDatabase.ejecutarConsultaSQL(`select l.codigo, l.autor, l.titulo, l.descripcion, l.edicion, l.stock, l.estado, c.descripcion as descripcion_categoria from libro l, categoria c where l.id_categoria=c.id order by l.codigo`);
        return resultadoLista.rows;
    }

    /**
     * Devuelve el id y descripcion de la categoria con el id de la instancia del objeto (this.id)
     * @returns any[]: datos de la categoria - undefined: si no encontro la categoria o si hubo error
     */
    public async obtenerDatosDeLibro(): Promise<{ codigo: number, autor: string, titulo: string, descripcion: string, edicion: string, stock: number, estado: boolean, id_categoria: number } | undefined> {
        try {
            let datosDeLibro: QueryResult = await this.conexionDatabase.ejecutarConsultaSQL(`select * from libro where codigo=${this.codigo}`);
            if (datosDeLibro.rowCount > 0) {
                return {
                    codigo: datosDeLibro.rows[0].codigo,
                    autor: datosDeLibro.rows[0].autor,
                    titulo: datosDeLibro.rows[0].titulo,
                    descripcion: datosDeLibro.rows[0].descripcion,
                    edicion: datosDeLibro.rows[0].edicion,
                    stock: datosDeLibro.rows[0].stock,
                    estado: datosDeLibro.rows[0].estado,
                    id_categoria: datosDeLibro.rows[0].id_categoria
                }
            } else {
                return undefined;
            }
        } catch (error) {
            console.log("Error en metodo obtenerDatosDeCategoria", error);
            return undefined;
        }
    }

    /**
     * Obtiene una lista de libros habilutados y guaradados en la BD
     * @returns Array (lista de libros habiltados)
     */
    public async obtenerLibrosHabilitados(): Promise<Array<{ codigo: number, autor: string, titulo: string, descripcion: string, edicion: string, stock: number, estado: boolean, descripcion_categoria: string }>> {
        let resultadoLista: QueryResult = await this.conexionDatabase.ejecutarConsultaSQL(`select l.codigo, l.autor, l.titulo, l.descripcion, l.edicion, l.stock, l.estado, c.descripcion as descripcion_categoria from libro l, categoria c where l.id_categoria=c.id and l.estado order by l.codigo`);
        return resultadoLista.rows;
    }

    /**
     * modifcar libro con el codigo (this.codigo)
     * @returns true si se modifico correctamente: false si no se pudo moficar
     */
    public async modificarLibro(): Promise<boolean> {
        try {
            await this.conexionDatabase.ejecutarConsultaSQL(`update libro set autor='${this.autor}', titulo='${this.titulo}', descripcion='${this.descripcion}', edicion='${this.edicion}', stock=${this.stock}, id_categoria=${this.idCategoria} where codigo=${this.codigo};`);
            return true;
        } catch (error) {
            console.log("Error en metodo modificarLibro modelo", error);
            return false;
        }
    }

    /**
     * Eliminar un libro guardado en la BD
     * @returns true si se elimino correctamente: false: si hubo problemas al eliminar
     */
    public async eliminarLibro(): Promise<boolean> {
        try {
            await this.conexionDatabase.ejecutarConsultaSQL(`delete from libro where codigo=${this.codigo}`);
            return true;
        } catch (error) {
            console.log("Error en metodo eliminarLibro", error);
            return false;
        }
    }

    /**
     * habilita o inhabilita un libro con el codigo (this.codigo) guardado en la BD
     * @returns true si se cambio el estado del libro a modificar
     */
    public async habilitarOInhabilitarLibro(): Promise<boolean> {
        try {
            await this.conexionDatabase.ejecutarConsultaSQL(`update libro set estado=not estado where codigo=${this.codigo}`);
            return true;
        } catch (error) {
            console.log("Error en metodo habilitarOInhabilitarLibro", error);
            return false;
        }
    }
}