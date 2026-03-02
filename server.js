const express = require('express');
const fetch   = require('node-fetch');
const app     = express();

app.use(express.json());
app.use(express.static(__dirname));

const API_URL = 'https://script.google.com/macros/s/AKfycbzceqRO6YAsIbY7AQLT6wlR1ez9zrUeBENH_7X-gEsvBhnWAjLAM_3bbeXKVc4cfmlDGA/exec';

app.get('/api', async (req, res) => {
  try {
    const data = await fetch(`${API_URL}?sheet=${req.query.sheet}`).then(r => r.json());
    res.json(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api', async (req, res) => {
  try {
    const data = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    }).then(r => r.json());
    res.json(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
