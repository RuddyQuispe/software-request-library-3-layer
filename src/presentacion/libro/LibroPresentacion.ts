/**
 * Materia: Arquitectura de Software
 * Carrera: Ing. Informatica
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 03-05-2021
 */

import { Request, Response, Router } from '../../config';
import { CategoriaNegocio } from '../../negocio/CategoriaNegocio';
import { LibroNegocio } from '../../negocio/LibroNegocio';


export class LibroPresentacion {
    /**
     * Atributos
     */
    public router: Router;
    private libroNegocio: LibroNegocio;
    private categoriaNegocio: CategoriaNegocio;

    /**
     * Constructor
     */
    constructor() {
        this.router = Router();
        this.createRoutes();
        this.libroNegocio = new LibroNegocio();
        this.categoriaNegocio = new CategoriaNegocio();
    }

    /**
 * retorna lista de libros
 * @param request : peticion de HTTP
 * @param response : respuesta de HTTP
 */
    public async obtenerVistaLibros(request: Request, response: Response): Promise<void> {
        let listaDeLibros = await this.libroNegocio.obtenerListaLibros();
        let listaDeCategorias = await this.categoriaNegocio.obtenerListaCategoria();
        response.render('libro/gestionar_libro', {
            lista_libro: listaDeLibros,
            lista_categorias: listaDeCategorias
        });
    }

    /**
     * guarda el nuevo libro con el valor de "{ codigo, autor, titulo, descripcion, edicion, stock, estado, id_categoria }" que recibe en el Objeto Request que entra por paramtero
     * @param request : peticion de HTTP
     * @param response : respuesta de HTTP
     */
    public async registrarLibro(request: Request, response: Response): Promise<void> {
        let { autor, titulo, descripcion, edicion, stock, id_categoria } = request.body;
        if (await this.libroNegocio.registrarNuevoLibro(autor, titulo, descripcion, edicion, Number(stock), Number(id_categoria))) {
            await this.obtenerVistaLibros(request, response);
        } else {
            await this.obtenerVistaLibros(request, response);
        }
    }

    /**
     * obtiene la vista de editar Libro
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async obtenerVistaEditarLibro(request: Request, response: Response): Promise<void> {
        let { codigo_libro } = request.params;
        let listaDeCategorias = await this.categoriaNegocio.obtenerListaCategoria();
        let datosDeLibro = await this.libroNegocio.obtenerDatosDelLibro(Number(codigo_libro));
        response.status(200).render('libro/editar_libro', {
            codigo: datosDeLibro.codigo,
            autor: datosDeLibro.autor,
            titulo: datosDeLibro.titulo,
            descripcion: datosDeLibro.descripcion,
            edicion: datosDeLibro.edicion,
            stock: datosDeLibro.stock,
            estado: datosDeLibro.estado,
            id_categoria: datosDeLibro.id_categoria,
            lista_categorias: listaDeCategorias
        });
    }

    /**
     * modifica los datos de un libro
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async modificarLibro(request: Request, response: Response): Promise<void> {
        let { codigo_libro } = request.params;
        let { autor, titulo, descripcion, edicion, stock, estado, id_categoria } = request.body;
        if (await this.libroNegocio.modificarLibro(Number(codigo_libro), autor, titulo, descripcion, edicion, stock, estado, id_categoria)) {
            // modificacion de libro correctamente
            this.obtenerVistaLibros(request, response);
        } else {
            // hubo errores en modificacion de categoria
            this.obtenerVistaLibros(request, response);
        }
    }

    /**
     * elimina un libro guradado en la BD
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async eliminarLibro(request: Request, response: Response): Promise<void> {
        let { codigo_libro } = request.params;
        if (await this.libroNegocio.eliminarLibro(Number(codigo_libro))) {
            // modificacion de libro correctamente
            this.obtenerVistaLibros(request, response);
        } else {
            // hubo errores en modificacion de categoria
            this.obtenerVistaLibros(request, response);
        }
    }

    /**
     * Este proceso se encarga de habilitar o inhabilitar un libro específico.
     * @param request : peticion HTTP
     * @param response : respuesta http
     */
    public async habilitarOInhabilitarLibro(request: Request, response: Response): Promise<void> {
        let { codigo_libro } = request.params;
        if (await this.libroNegocio.habilitarOInhabilitarLibro(Number(codigo_libro))) {
            // modificacion de libro correctamente
            this.obtenerVistaLibros(request, response);
        } else {
            // hubo errores en modificacion de categoria
            this.obtenerVistaLibros(request, response);
        }
    }

    /**
     * metodo privado para cargar las rutas que disponen en los metodos HTTP
     */
    private createRoutes() {
        this.router.route('/').get(async (req: Request, res: Response) => this.obtenerVistaLibros(req, res));
        this.router.route('/').post(async (req: Request, res: Response) => this.registrarLibro(req, res));
        this.router.route('/:codigo_libro').get(async (req: Request, res: Response) => this.obtenerVistaEditarLibro(req, res));
        this.router.route('/modificar/:codigo_libro').put(async (req: Request, res: Response) => this.modificarLibro(req, res));
        this.router.route('/eliminar/:codigo_libro').delete(async (req: Request, res: Response) => this.eliminarLibro(req, res));
        this.router.route('/habilitar_inhabilitar/:codigo_libro').put(async (req: Request, res: Response) => this.habilitarOInhabilitarLibro(req, res));
    }
}