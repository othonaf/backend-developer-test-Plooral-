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
router.get('/companies/:company_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company_id = req.params.company_id;
    try {
        const selectedCompanie = yield (0, connection_1.default)('companies')
            .select()
            .where({ id: company_id });
        res.status(200).send(selectedCompanie);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Sem acesso ao servidor.");
    }
}));
exports.default = router;
