/**
 * Materia: Arquitectura de Software
 * Carrera: Ing. Informatica
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 0.0.1
 * @since: 12-04-2021
 */

import { App } from './app';

/**
 * method initialize process on a port
 */
async function main(): Promise<void> {
    const app = new App(4000);
    await app.listen();
}

main();