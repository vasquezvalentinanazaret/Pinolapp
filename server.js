
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>res.json({status:'API OK'}));

app.listen(process.env.PORT || 4000, ()=>console.log('Server running'));
