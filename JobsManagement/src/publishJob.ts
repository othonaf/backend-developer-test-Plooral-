import express from 'express';
import connection from "./connection";
import { Request, Response } from 'express';
import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1'
});
const router = express.Router();
const sqs = new AWS.SQS();

router.put('/job/:job_id/publish', async (req: Request, res: Response) => {
    const { job_id } = req.params;
    const status = "draft";

    try {
        // Verificar se o Id existe no banco de dados:
        const validateId = await connection('jobs').where({ id: job_id });
        if (validateId.length === 0) {
            return res.status(400).send("Anúncio não encontrado.");
        }

        await connection('jobs').update({ status }).where({ id: job_id });

        // Adicionando o trabalho à fila do AWS SQS:
        const params = {
            MessageBody: JSON.stringify({ job_id }),
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/043735963428/TestePlooralOthon'
        };

        sqs.sendMessage(params, function (err, data) {
            if (err) {
                console.log("Erro", err);
                res.status(500).send("Erro ao adicionar o trabalho à fila.");
            } else {
                console.log("Sucesso", data.MessageId);
                res.status(200).send("Anúncio adicionado à fila com sucesso!");
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).send("Sem acesso ao servidor.")
    }
})

export default router;
