import express from 'express';
import connection from "./connection";
import { Request, Response } from 'express';


const router = express.Router();

router.get('/companies', async (req: Request, res: Response) => {
    try {
        const empresas = await connection('companies').select();

        res.status(200).send(empresas)

    } catch (error) {
        console.error(error);
        res.status(500).send("Sem acesso ao servidor.")
    }
})

export default router;