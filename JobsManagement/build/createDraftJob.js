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
router.post('/job', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_id, title, notes, description, location } = req.body;
    try {
        //Validar se os campos obrigatórios foram devidamente preenchidos:
        if (!company_id || !title || !notes || !description || !location) {
            return res.status(400).send("Por gentileza, preencher campos obrigatórios.");
        }
        yield (0, connection_1.default)('jobs').insert({
            company_id, title, notes, description, location
        });
        res.status(200).send("Registro criado com sucesso!");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Sem acesso ao servidor.");
    }
}));
exports.default = router;
