import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import authRouter from './routes/auth-router.js';
import teamsRouter from './routes/teams-router.js';
import linksRouter from './routes/links-router.js';
import blogRouter from './routes/blog-routher.js';
import faqRouter from './routes/faq-router.js';
import cors from 'cors';
import './database/index.js'

// Užkrauna duomenis iš .env failo
config();
// Sukuria serverio objektą, kuris galės atsakyti į užklausas
const server = express();
// iš vykstančios programos aplinkos pasiemame kintamį, kuris buvo aprašytas .env faile
const { SERVER_PORT } = process.env;

// Middlewares
// Darant užklausas į serverį atspausdina minimalią informacija paleisto serverio konsolėje
server.use(morgan('tiny'));
// Leidžia vykdyti užklausas iš visų puslapių
server.use(cors());
// Gavus JSON tipo duomenis, įdeda į request handlerio už-klausos parametrą -> req.body
server.use(express.json());

// Response handlers
// Visas užklasas kurios prasideda  adresu '/api/auth' serveris nukreips į authRouter
server.use('/api/auth', authRouter);
server.use('/api/teams', teamsRouter);
server.use('/api/links', linksRouter);
server.use('/api/blog', blogRouter);
server.use('/api/faq', faqRouter);

// Serveriui perduodamos užklausos, kurios bus gautos į šio kompiuterio 5000'inį port'ą
server.listen(SERVER_PORT, () => {
  console.log(`serveris veikia ant http://localhost:${SERVER_PORT}/`);
});