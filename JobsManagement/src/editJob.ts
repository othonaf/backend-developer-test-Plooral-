import express from 'express';
import connection from "./connection";
import { Request, Response } from 'express';

const router = express.Router();

router.put('/job/:job_id', async (req: Request, res: Response) => {
    const { job_id } = req.params;
    const { title, notes, description, location } = req.body;
    try {
        //Validar se os campos obrigatórios foram devidamente preenchidos:
        if (!title || !notes || !description || !location) {
            return res.status(400).send("Por gentileza, preencher campos obrigatórios.");
        }

        // Verificar se o Id existe no banco de dados:
        const validateId = await connection('jobs').where({ id: job_id });
        if (validateId.length === 0) {
            return res.status(400).send("Anúncio não encontrado.");
        }

        await connection('jobs').update({
            title, notes, description, location
        }).where({ id: job_id });

        res.status(200).send("Registro atualizado com sucesso!")

    } catch (error) {
        console.log(error)
        res.status(500).send("Sem acesso ao servidor.")
    }
})

export default router;