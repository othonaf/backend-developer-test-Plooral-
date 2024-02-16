import express from 'express';
import { Request, Response } from 'express';
import AWS, { AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

const router = express.Router();
const s3 = new AWS.S3();

router.get('/feed', async (req: Request, res: Response) => {
    const params = {
        Bucket: 'teste-plooral-othon',
        Key: 'publishedJobs.json' 
    };

    try {
        const data: PromiseResult<AWS.S3.GetObjectOutput, AWSError> = await s3.getObject(params).promise();

        if (data.Body) {
            const jobs = JSON.parse(data.Body.toString());
            res.status(200).send(jobs);
        } else {
            throw new Error('Body is undefined');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Sem acesso ao servidor.");
    }
});

export default router;
