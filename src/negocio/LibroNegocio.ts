/**
 * Materia: Arquitectura de Software
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 03-05-2021
 */

import { LibroDatos } from "../datos/LibroDatos";


export class LibroNegocio {

    /**
     * Atributos
     */
    private libroDatos: LibroDatos;

    /**
     * Constructor
     */
    constructor() {
        this.libroDatos = new LibroDatos();
    }

    /**
     * obtiene lista de libros guardados en la BD
     * @returns Lista libros (JSON)
     */
    public async obtenerListaLibros(): Promise<Array<{ codigo: number, autor: string, titulo: string, descripcion: string, edicion: string, stock: number, estado: boolean, descripcion_categoria: string }>> {
        let listaLibros = await this.libroDatos.obtenerListaLibros();
        return listaLibros ?? [];
    }

    /**
     * Registra el libro
     * @param autor : autor del libros
     * @param titulo : titulo del libro
     * @param descripcion : pequenio resumen del libro
     * @param edicion : edicion del libro (1ra, 4ta, 7ma, 15va)
     * @param stock : cantidad existente del libro en la biblioteca
     * @param id_categoria : id de la categoria del libro
     * @returns true si se registro el libro, false si hubo problemas al registrar
     */
    public async registrarNuevoLibro(autor: string, titulo: string, descripcion: string, edicion: string, stock: number, id_categoria: number): Promise<boolean> {
        this.libroDatos.setAutor(autor);
        this.libroDatos.setTitulo(titulo);
        this.libroDatos.setDescripcion(descripcion);
        this.libroDatos.setEdicion(edicion);
        this.libroDatos.setStock(stock);
        this.libroDatos.setIdCategoria(id_categoria);
        return await this.libroDatos.registrarLibro();
    }

    /**
     * obtiene los datos especificos de un libro guardado en la BD
     * @param codigoLibro : codigo del libro registrado en la BD
     * @returns informacion del libro
     */
    public async obtenerDatosDelLibro(codigoLibro: number): Promise<{ codigo: number, autor: string, titulo: string, descripcion: string, edicion: string, stock: number, estado: boolean, id_categoria: number }> {
        this.libroDatos.setCodigo(codigoLibro);
        return await this.libroDatos.obtenerDatosDeLibro() ?? {
            codigo: -1,
            autor: "none",
            titulo: "none",
            descripcion: "none",
            edicion: "none",
            stock: -1,
            estado: false,
            id_categoria: -1
        };
    }

    /**
     * Modifica los datos del libro en la BD
     * @param codigo : codigo del libro
     * @param autor : autor del libro
     * @param titulo : titulo del libro
     * @param descripcion : descripcion del libro
     * @param edicion : edicion del libro
     * @param stock : nueva cantidad disponible del libro
     * @param estado : estado del libro
     * @param id_categoria : categoria del libro (obtenido su identifcador)
     * @returns true si se modifico el libro si problemas; false si hubo error al modificar el libro
     */
    public async modificarLibro(codigo: number, autor: string, titulo: string, descripcion: string, edicion: string, stock: number, estado: boolean, id_categoria: number): Promise<boolean> {
        this.libroDatos.setCodigo(Number(codigo));
        this.libroDatos.setAutor(autor);
        this.libroDatos.setTitulo(titulo);
        this.libroDatos.setDescripcion(descripcion);
        this.libroDatos.setEdicion(edicion);
        this.libroDatos.setStock(stock);
        this.libroDatos.setEstado(estado);
        this.libroDatos.setIdCategoria(id_categoria);
        return await this.libroDatos.modificarLibro();
    }

    /**
     * Eliminar un libro de la BD
     */
    public async eliminarLibro(codigoLibro: number): Promise<boolean> {
        this.libroDatos.setCodigo(Number(codigoLibro));
        return await this.libroDatos.eliminarLibro();
    }

    /**
     * modificar el estado de un libro guardad en la BD
     * @param codigo : codigo del libro
     * @returns : true si se cambio el estado del libro, caso contrario: false
     */
    public async habilitarOInhabilitarLibro(codigo: number): Promise<boolean> {
        this.libroDatos.setCodigo(codigo);
        return await this.libroDatos.habilitarOInhabilitarLibro();
    }
}