import app from "./app";
import allCompanies from './selectAllCompanies';
import companiesById from './selectCompanyById';
import draftJob from './createDraftJob';
import publishJob from './publishJob';
import editJob from './editJob';
import deleteJob from './deleteJob';
import archiveJobs from './archiveJob';
import feedJobs from './getFeedJobs';

 // ROTA PARA O ENDPOINT DE LISTAR TODAS AS EMPRESAS:
app.use('/api', allCompanies)

// ROTA PARA O ENDPOINT DE SELECIONAR EMPRESA POR ID:
app.use('/api', companiesById)

// ROTA PARA O ENDPOINT DE CRIAR UM RASCUNHO:
app.use('/api', draftJob)

 // ROTA PARA O ENDPOINT DE PUBLICAR UM ANÚNCIO (JOB):
app.use('/api', publishJob)

  // ROTA PARA O ENDPOINT PARA EDITAR UM ANÚNCIO (JOB):
app.use('/api', editJob);

// ROTA PARA O ENDPOINT PARA DELETAR UM ANÚNCIO (JOB):
app.use('/api', deleteJob);

// ROTA PARA O ENDPOINT PARA ARQUIVAR UM ANÚNCIO (JOB):
app.use('/api', archiveJobs);

// ROTA PARA O ENDPOINT DE BUSCAR ANÚNCIOS DO S3 (AWS):
app.use('/api', feedJobs);