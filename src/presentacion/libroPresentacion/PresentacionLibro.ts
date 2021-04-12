import { Request, Response, Router } from 'express';

export default class PresentacionLibro {
    public router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    public async getListaLibros(request: Request, response: Response): Promise<void> {
        response.render('libroPresentacion/registrarLibro.hbs');
    }

    private createRoutes() {
        this.router.route('/').get((req: Request, res: Response) => this.getListaLibros(req, res));
        // this.router.route('/registrar').post(async (req: Request, res: Response) => this.registrar(req,res));            
        // this.router.route('/editar').post(async (req: Request, res: Response) => this.editar(req,res));
        // this.router.route('/modificar').put(async (req: Request, res: Response) => this.modificar(req,res));
        // this.router.route('/eliminar').delete(async (req: Request, res: Response) => this.eliminar(req,res));
    }
}