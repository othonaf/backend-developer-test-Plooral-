import express from 'express';
import connection from "./connection";
import { Request, Response } from 'express';

const router = express.Router();

router.get('/companies/:company_id', async (req: Request, res: Response) => {
    const company_id = req.params.company_id 
    try {
         const selectedCompanie = await connection('companies')
         .select()
         .where({id: company_id})

         res.status(200).send(selectedCompanie)

    } catch (error) {
        console.error(error);
        res.status(500).send("Sem acesso ao servidor.")
    }
})

export default router;