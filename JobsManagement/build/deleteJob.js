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
const router = express_1.default.Router();
router.delete('/job/:job_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { job_id } = req.params;
    try {
        // Verificar se o Id existe no banco de dados:
        const validateId = yield (0, connection_1.default)('jobs').where({ id: job_id });
        if (validateId.length === 0) {
            return res.status(400).send("Anúncio não encontrado.");
        }
        yield (0, connection_1.default)('jobs').delete().where({ id: job_id });
        res.status(200).send("Registro deletado com sucesso!");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Sem acesso ao servidor.");
    }
}));
exports.default = router;
