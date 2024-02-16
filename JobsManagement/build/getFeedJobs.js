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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const router = express_1.default.Router();
const s3 = new aws_sdk_1.default.S3();
router.get('/feed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: 'teste-plooral-othon',
        Key: 'publishedJobs.json'
    };
    try {
        const data = yield s3.getObject(params).promise();
        if (data.Body) {
            const jobs = JSON.parse(data.Body.toString());
            res.status(200).send(jobs);
        }
        else {
            throw new Error('Body is undefined');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Sem acesso ao servidor.");
    }
}));
exports.default = router;
