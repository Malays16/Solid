import express from 'express';
import bodyParser from 'body-parser';
import error404 from './middleware/error404';
import error400 from './middleware/error400';
import bookRoutes from './routes/bookRoutes';
import apiRoutes from './routes/apiRoutes';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/', bookRoutes);
app.use('/api', apiRoutes);

app.use(error404);
app.use(error400);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on ${PORT}`));
