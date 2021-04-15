/**
 * Materia: Arquitectura de Software
 * Carrera: Ing. Informatica
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 14-04-2021
 */

import { CategoriaDatos } from "../datos/CategoriaDatos";


export class CategoriaNegocio {

    /**
     * Atributo
     */
    private categoriaDatos: CategoriaDatos;

    /**
     * Constructor
     */
    constructor() {
        this.categoriaDatos = new CategoriaDatos();
    }

    /**
     * obtiene las categorias guardadas en la BD
     * @returns Array<{number, string}> lista de categorias
     */
    public async obtenerListaCategoria(): Promise<Array<{ id: number, descripcion: string }>> {
        let listaCategorias: Array<{ id: number, descripcion: string }> | undefined = await this.categoriaDatos.obtenerListaCategoria();
        if (listaCategorias) {
            // se obtuvo la lista de categorias
            return listaCategorias;
        } else {
            // no hay categorias, o hubo un error al obtener
            return [];
        }
    }

    /**
     * Obteine los datos de la categoria con el id ingreado por parametro
     * @param idCategoria : id categoria
     * @returns { id: number, descripcion: string } datos de categoria requerida
     */
    public async obtenerDatosCategoria(idCategoria: number): Promise<{ id: number, descripcion: string }> {
        let datosCategoria: { id: number, descripcion: string } = await this.categoriaDatos.obtenerDatosDeCategoria(idCategoria);
        return datosCategoria;
    }

    /**
     * modifica la descripcion de categoria
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async modificarCategoria(idCategoria: number, descripcion: string): Promise<boolean> {
        this.categoriaDatos.setDescripcion(descripcion);
        this.categoriaDatos.setId(Number(idCategoria));
        return await this.categoriaDatos.modificarCategoria();
    }

    /**
     * guarda la nueva categoria con el valor de "descripcion" de este objeto
     * @param request : peticion de HTTP
     * @param response : respuesta de HTTP
     */
    public async registrarCategoria(descripcion: string): Promise<boolean> {
        this.categoriaDatos.setDescripcion(descripcion);
        return await this.categoriaDatos.registrarCategoria();
    }

}