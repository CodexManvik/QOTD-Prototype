import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './routes/api.routes.js';

const app = express();

app.use(helmet());
app.use(cors());

app.use(morgan('combined'));

// Body Parser
app.use(express.json());

// Mock Auth
import { mockAuth } from './middlewares/mockAuth.middleware.js';
app.use(mockAuth);

// Static Files
app.use(express.static('public'));

app.use('/api/v1', apiRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.name || 'Internal Server Error',
        message: err.message || 'Something went wrong'
    });
});

export default app;
