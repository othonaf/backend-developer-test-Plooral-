import express from 'express';
import connection from "./connection";
import { Request, Response } from 'express';

const router = express.Router();

router.post('/job', async (req: Request, res: Response) => {
    const {company_id, title, notes, description, location} = req.body;    
    try {
        //Validar se os campos obrigatórios foram devidamente preenchidos:
        if (!company_id || !title || !notes || !description || !location){
            return res.status(400).send("Por gentileza, preencher campos obrigatórios.");
        }
        await connection('jobs').insert({
            company_id, title, notes, description, location
        })
        res.status(200).send("Registro criado com sucesso!")

    } catch (error) {
        console.log(error)
        res.status(500).send("Sem acesso ao servidor.")
    }
})

export default router;