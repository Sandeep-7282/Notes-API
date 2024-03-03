const express = require('express');
const app = express();
const port = 4000;
const cors=require('cors')
const notesapi=require('./routes/notes');

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/notes',notesapi)
// Start the server
app.listen(port, () =>{
  console.log(`Server is running`);
});
