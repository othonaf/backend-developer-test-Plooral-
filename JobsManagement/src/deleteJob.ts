import express from 'express';
import connection from "./connection";
import { Request, Response } from 'express';

const router = express.Router();

router.delete('/job/:job_id', async (req: Request, res: Response) => {
    const { job_id } = req.params;
    try {
        // Verificar se o Id existe no banco de dados:
        const validateId = await connection('jobs').where({ id: job_id });
        if (validateId.length === 0) {
            return res.status(400).send("Anúncio não encontrado.");
        }

        await connection('jobs').delete().where({ id: job_id });

        res.status(200).send("Registro deletado com sucesso!")

    } catch (error) {
        console.log(error)
        res.status(500).send("Sem acesso ao servidor.")
    }
})

export default router;