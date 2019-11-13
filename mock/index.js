const express = require('express');

const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())

var total = 1;

app.post('/sku', (req, res) => {
  const sku = req.body;

  console.log(`Publicando Sku ${total}: ` + sku.partnerId);

  total++;

  return res.status(200);
})

app.listen(5555); 