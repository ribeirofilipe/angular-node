const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())

app.post('/sku', async (req, res) => {
  console.log(`Sku ${req.body.partnerId} Publicado.`);
  return res.json(req.body);
})

app.listen(5555); 