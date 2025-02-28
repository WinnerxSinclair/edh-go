const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});


const getCard = async (card) => {
  try{
    console.log('fetching card');
    const response = await axios.get(`https://api.scryfall.com/cards/search?q=${card}`,{
      headers: {
        'User-Agent': 'lifecounter/1.0',
        'Accept': 'application/json'
      }
    })
    return response;
  }catch(error){
    console.log('error fetching card', error);
  }
}

app.get('/api/card/:card', async (req, res) => {
  try{
    const { card } = req.params;
    const cards = await getCard(card);
    res.json(cards.data);
  }catch(error){
    console.error(error);
    res.status(500).send('failed');
  }
})

app.get('/api/prints/:oracle', async (req, res) => {
  try{
    console.log('fetching prints')
    const { oracle } = req.params;
    const prints = await axios.get(`https://api.scryfall.com/cards/search?order=released&q=oracleid:${oracle}&unique=prints`, {
      headers: {
        'User-Agent': 'lifecounter/1.0',
        'Accept': 'application/json'
      }
    });
    res.json(prints.data);
  }catch(error){
    console.error(error);
    res.status(500).send('failed');
  }
})


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})