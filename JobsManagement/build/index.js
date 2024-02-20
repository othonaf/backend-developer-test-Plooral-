"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const selectAllCompanies_1 = __importDefault(require("./selectAllCompanies"));
const selectCompanyById_1 = __importDefault(require("./selectCompanyById"));
const createDraftJob_1 = __importDefault(require("./createDraftJob"));
const publishJob_1 = __importDefault(require("./publishJob"));
const editJob_1 = __importDefault(require("./editJob"));
const deleteJob_1 = __importDefault(require("./deleteJob"));
const archiveJob_1 = __importDefault(require("./archiveJob"));
const getFeedJobs_1 = __importDefault(require("./getFeedJobs"));
const serverless_http_1 = __importDefault(require("serverless-http"));
// ROTA PARA O ENDPOINT DE LISTAR TODAS AS EMPRESAS:
app_1.default.use('/api', selectAllCompanies_1.default);
// ROTA PARA O ENDPOINT DE SELECIONAR EMPRESA POR ID:
app_1.default.use('/api', selectCompanyById_1.default);
// ROTA PARA O ENDPOINT DE CRIAR UM RASCUNHO:
app_1.default.use('/api', createDraftJob_1.default);
// ROTA PARA O ENDPOINT DE PUBLICAR UM ANÚNCIO (JOB):
app_1.default.use('/api', publishJob_1.default);
// ROTA PARA O ENDPOINT PARA EDITAR UM ANÚNCIO (JOB):
app_1.default.use('/api', editJob_1.default);
// ROTA PARA O ENDPOINT PARA DELETAR UM ANÚNCIO (JOB):
app_1.default.use('/api', deleteJob_1.default);
// ROTA PARA O ENDPOINT PARA ARQUIVAR UM ANÚNCIO (JOB):
app_1.default.use('/api', archiveJob_1.default);
// ROTA PARA O ENDPOINT DE BUSCAR ANÚNCIOS DO S3 (AWS):
app_1.default.use('/api', getFeedJobs_1.default);
module.exports.handler = (0, serverless_http_1.default)(app_1.default);
