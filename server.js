import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3002;

const log = ({ method, url, params, query, body }) => {
  console.log(`\n[${new Date().toISOString()}]`);
  console.log(`Request: ${method} - ${url}`);
  console.log(`  params: `, params);
  console.log(`  query: `, query);
  console.log(`  body: `, body);
};

const processRequest = (req, res) => {
  log(req);
  return true;
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  if (processRequest(req, res)) {
    res.json({ info: 'Node.js, Express, and Postgres API' });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
