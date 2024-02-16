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
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./connection"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const router = express_1.default.Router();
const sqs = new aws_sdk_1.default.SQS();
router.put('/job/:job_id/publish', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { job_id } = req.params;
    const status = "draft";
    try {
        // Verificar se o Id existe no banco de dados:
        const validateId = yield (0, connection_1.default)('jobs').where({ id: job_id });
        if (validateId.length === 0) {
            return res.status(400).send("Anúncio não encontrado.");
        }
        yield (0, connection_1.default)('jobs').update({ status }).where({ id: job_id });
        // Adicionando o trabalho à fila do AWS SQS:
        const params = {
            MessageBody: JSON.stringify({ job_id }),
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/043735963428/TestePlooralOthon'
        };
        sqs.sendMessage(params, function (err, data) {
            if (err) {
                console.log("Erro", err);
                res.status(500).send("Erro ao adicionar o trabalho à fila.");
            }
            else {
                console.log("Sucesso", data.MessageId);
                res.status(200).send("Anúncio adicionado à fila com sucesso!");
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Sem acesso ao servidor.");
    }
}));
exports.default = router;
