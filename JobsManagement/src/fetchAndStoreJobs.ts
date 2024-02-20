import AWS from 'aws-sdk';
import connection from './connection';
import axios from 'axios';

AWS.config.update({
    region: 'us-east-1'
});
const s3 = new AWS.S3();

exports.handler = async (event: AWSLambda.APIGatewayEvent): Promise<AWSLambda.APIGatewayProxyResult> => {
    try {
        const jobs = await connection('jobs').select().where('status', 'draft');

        for (let job of jobs) {
            const openAIEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
            const prompt = `Avalie o seguinte conteúdo para conteúdo prejudicial: ${job.title} ${job.description}`;

            const response = await axios.post(openAIEndpoint, {
                prompt,
                max_tokens: 60
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            });

            const aiResponse = response.data.choices[0].text.trim();
            if (aiResponse === 'safe') {
                job.status = 'published';
            } else {
                job.status = 'rejected';
                job.notes = aiResponse;
            }

            await connection('jobs').update(job).where({ id: job.id });
        }

        const publishedJobs = jobs.filter(job => job.status === 'published');
        const params: AWS.S3.PutObjectRequest = {
            Bucket: 'teste-plooral-othon', 
            Key: 'publishedJobs.json', 
            Body: JSON.stringify(publishedJobs)
        };

        await s3.putObject(params).promise();

        return {
            statusCode: 200,
            body: 'Dados atualizados com sucesso!'
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: 'Erro ao atualizar os dados.'
        };
    }
};
