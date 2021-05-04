/**
 * Materia: Arquitectura de Software
 * Carrera: Ing. Informatica
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 14-04-2021
 */

import { Request, Response, Router } from '../../config';
import { CategoriaNegocio } from '../../negocio/CategoriaNegocio';

export class CategoriaPresentacion {
    /**
     * Atributos
     */
    public router: Router;
    private categoriaNegocio: CategoriaNegocio;

    /**
     * Constructor
     */
    constructor() {
        this.router = Router();
        this.createRoutes();
        this.categoriaNegocio = new CategoriaNegocio();
    }

    /**
     * obtiene la vista de gestionar categoria y envia la lista de categorias para su integracion
     * al HTML 
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async obtenerPresentacionCategoria(request: Request, response: Response): Promise<void> {
        let listaCategorias: Array<{ id: number, descripcion: string }> = await this.categoriaNegocio.obtenerListaCategoria();
        response.render('categoria/gestionar_categoria', {
            lista_categorias: listaCategorias
        });
    }

    /**
     * obtiene los datos de la categoria enviado por request.params.id_categoria
     * y entrega una vista HTML con los datos
     * @param request : peticion http
     * @param response : respuesta http
     */
    public async obtenerPresentacionEditarCategoria(request: Request, response: Response): Promise<void> {
        let { id_categoria } = request.params;
        let datosCategoria = await this.categoriaNegocio.obtenerDatosCategoria(Number(id_categoria));
        response.render('categoria/editar_categoria', {
            id_categoria: datosCategoria.id,
            descripcion: datosCategoria.descripcion
        });
    }

    /**
     * guarda la nueva categoria con el valor de "descripcion" de este objeto
     * @param request : peticion de HTTP
     * @param response : respuesta de HTTP
     */
    public async registrarCategoria(request: Request, response: Response): Promise<void> {
        let { descripcion_categoria } = request.body;
        if (await this.categoriaNegocio.registrarCategoria(descripcion_categoria)) {
            await this.obtenerPresentacionCategoria(request, response);
        } else {
            await this.obtenerPresentacionCategoria(request, response);
        }
    }

    /**
     * modifica la descripcion de categoria
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async modificarCategoria(request: Request, response: Response): Promise<void> {
        let { id_categoria } = request.params;
        let { descripcion } = request.body;
        if (await this.categoriaNegocio.modificarCategoria(Number(id_categoria), descripcion)) {
            // modificacion de categoria correctamente
            await this.obtenerPresentacionCategoria(request, response);
        } else {
            // hubo errores en modificacion de categoria
            await this.obtenerPresentacionCategoria(request, response);
        }
    }

    /**
     * metodo privado para cargar las rutas que disponen en los metodos HTTP
     */
    private createRoutes() {
        this.router.route('/').get(async (req: Request, res: Response) => this.obtenerPresentacionCategoria(req, res));
        this.router.route('/').post(async (req: Request, res: Response) => this.registrarCategoria(req, res));
        this.router.route('/:id_categoria').get(async (req: Request, res: Response) => this.obtenerPresentacionEditarCategoria(req, res));
        this.router.route('/modificar/:id_categoria').put(async (req: Request, res: Response) => this.modificarCategoria(req, res));
    }
}