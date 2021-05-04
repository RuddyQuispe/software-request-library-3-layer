/**
 * Materia: Arquitectura de Software
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 14-04-2021
 */

/**
 * Importacion de librerias
 */
import { Pool, QueryResult } from 'pg';
import { config as dotenv } from 'dotenv';

/**
 * Clase Conexion
 * Clase para la conexion y uso a la BD, especificado las caracteristicas en el constructor o getInstancia
 */
export class Conexion {

    /**
     * Atributos
     */
    private static _instancia: Conexion;
    private session: Pool;

    /**
     * Inicia instancia de la sesion a la BD
     * @param host host de la BD (ip o host)
     * @param user usuario de la DBMS
     * @param password constraseña de acceso del usuario
     * @param database nombre de la BD
     * @param port puerto en escucha de DBMS
     */
    private constructor(host: string, user: string, password: string, database: string, port: number) {
        try {
            this.session = new Pool({
                host,
                user,
                password,
                database,
                port
            });
            this.session.connect();
            console.log("\x1b[30m", "\x1b[42m", `Base de Datos "${database} en hots: ${host}:${port}" por el usuario: ${user}`, "\x1b[0m");
        } catch (error) {
            console.log("\x1b[30m", "\x1b[41m", `Error en conexion a la BD: ${database}`, "\x1b[0m");
        }
    }

    /**
     * retorna una instancia ya habilitada a la BD, o si no lo tiene creauna nueva
     * @returns conexion habilitada a la BD
     */
    public static getInstancia(): Conexion {
        if (!this._instancia) {
            console.log("\x1b[44m", "\x1b[30m", "creando nueva instancia...", "\x1b[0m");
            dotenv();
            let { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
            this._instancia = new Conexion(String(DB_HOST), String(DB_USERNAME), String(DB_PASSWORD), String(DB_DATABASE), parseInt(String(DB_PORT)));
        }
        return this._instancia;
    }

    /**
     * Metodo para poder manipular la BD desde este software, unico medio para la manipulacion de la BD
     * @param consultaSQL consulta SQL para la manipulacion a la BD a traves de este objeto y este metodo
     * @returns QueryResult si obtiene un resultado; caso contrario undefined si ocurrio un error en la ejecucion de la consulta
     */
    public async ejecutarConsultaSQL(consultaSQL: string): Promise<QueryResult> {
        let resultado: QueryResult = await this.session.query(consultaSQL);
        return resultado;
    }
}