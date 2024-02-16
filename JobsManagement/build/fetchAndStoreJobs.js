"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const connection_1 = __importDefault(require("./connection"));
const axios_1 = __importDefault(require("axios"));
const s3 = new aws_sdk_1.default.S3();
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield (0, connection_1.default)('jobs').select().where('status', 'draft');
        for (let job of jobs) {
            const openAIEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
            const prompt = `Avalie o seguinte conteúdo para conteúdo prejudicial: ${job.title} ${job.description}`;
            const response = yield axios_1.default.post(openAIEndpoint, {
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
            }
            else {
                job.status = 'rejected';
                job.notes = aiResponse;
            }
            yield (0, connection_1.default)('jobs').update(job).where({ id: job.id });
        }
        const publishedJobs = jobs.filter(job => job.status === 'published');
        const params = {
            Bucket: 'teste-plooral-othon',
            Key: 'publishedJobs.json',
            Body: JSON.stringify(publishedJobs)
        };
        yield s3.putObject(params).promise();
        return {
            statusCode: 200,
            body: 'Dados atualizados com sucesso!'
        };
    }
    catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: 'Erro ao atualizar os dados.'
        };
    }
});
