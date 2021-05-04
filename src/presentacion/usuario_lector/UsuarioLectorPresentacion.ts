/**
 * Materia: Arquitectura de Software
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani
 * @version: 0.0.1
 * @since: 04-05-2021
 */

import { Request, Response, Router } from "../../config";
import { UsuarioLectorNegocio } from "../../negocio/UsuarioLectorNegocio";


export class UsuarioLectorPresentacion {
    /**
     * Atributos
     */
    public router: Router;
    private usuarioLectorNegocio: UsuarioLectorNegocio;

    /**
     * Constructor
     */
    constructor() {
        this.router = Router();
        this.createRoutes();
        this.usuarioLectorNegocio = new UsuarioLectorNegocio();
    }

    /**
     * obtiene la vista de usuarios lectores, junto a una lista de usuarios guardados en la BD.
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async obtenerVistaUsuarioLector(request: Request, response: Response): Promise<void> {
        let listarDeUsuariosLectores: Array<{ ci: number, nombre: string, apellidos: string, email: string, telefono: string }> = await this.usuarioLectorNegocio.obtenerListaDeUsuariosLectores();
        response.render('usuario_lector/gestionar_usuario_lector', {
            lista_usuarios_lectores: listarDeUsuariosLectores
        });
    }

    /**
     * registra unusuario lector a la BD del software
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async registrarUsuarioLector(request: Request, response: Response): Promise<void> {
        let { ci, nombre, apellidos, email, telefono } = request.body;
        if (await this.usuarioLectorNegocio.registrarUsuarioLector(ci, nombre, apellidos, email, telefono)) {
            await this.obtenerVistaUsuarioLector(request, response);
        } else {
            await this.obtenerVistaUsuarioLector(request, response);
        }
    }

    /**
     * Este metodo obtiene los datos de un usuario lector en base de su CI, y devuelve una vista HTML de editar usuario lector
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async obtenerVistaEditarUsuarioLector(request: Request, response: Response): Promise<void> {
        let { ci_usuario_lector } = request.params;
        let datosUsuarioLector: { ci: number, nombre: string, apellidos: string, email: string, telefono: string } = await this.usuarioLectorNegocio.obtenerDatosDeUsuarioLector(Number(ci_usuario_lector));
        response.status(200).render('usuario_lector/editar_usuario_lector', datosUsuarioLector);
    }


    /**
     * Metodo que modifica los datos de un usuario lector y ontiene la vista de gestionar usuarios lectores
     * @param request : peticion HTTP
     * @param response : respuesta HTTP
     */
    public async modificarUsuarioLector(request: Request, response: Response): Promise<void> {
        let { ci_usuario_lector } = request.params;
        let { nombre, apellidos, email, telefono } = request.body;
        if (await this.usuarioLectorNegocio.modificarUsuarioLector(Number(ci_usuario_lector), nombre, apellidos, email, telefono)) {
            await this.obtenerVistaUsuarioLector(request, response);
        } else {
            await this.obtenerVistaUsuarioLector(request, response);
        }
    }

    private async createRoutes(): Promise<void> {
        this.router.route('/').get(async (req: Request, res: Response) => this.obtenerVistaUsuarioLector(req, res));
        this.router.route('/').post(async (req: Request, res: Response) => this.registrarUsuarioLector(req, res));
        this.router.route('/:ci_usuario_lector').get(async (req: Request, res: Response) => this.obtenerVistaEditarUsuarioLector(req, res));
        this.router.route('/modificar/:ci_usuario_lector').put(async (req: Request, res: Response) => this.modificarUsuarioLector(req, res));
    }
}