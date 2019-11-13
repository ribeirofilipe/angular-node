import axios from 'axios';

class ProductController {
  async index(req ,res) {
    const skus = await axios.get('http://localhost:4444/skus');

    return res.json(skus.data);
  };

  async store(req, res) {
    const skus = await axios.get('http://localhost:4444/skus');

    skus.data.forEach(async sku => {
      await axios.post('http://localhost:5555/sku', { sku });
    })

    return res.json(200);
  }
}

export default new ProductController();