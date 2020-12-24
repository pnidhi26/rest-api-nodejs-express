const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// require('dotenv/config');
// const cors = require('cors');


// SWAGGER CONNECTION
// const swaggerUi = require(‘swagger-ui-express’);
//     swaggerDocument = require(‘./swagger.json’);

// Connect to DB
mongoose.connect(
    "mongodb+srv://pnv:pnv123@cluster0.49xag.mongodb.net/rest?retryWrites=true&w=majority",
    {  useUnifiedTopology: true, useNewUrlParser: true  },
    () => console.log('connected to DB!')
);


// Middle wares
app.use(bodyParser.json());

// app.use(cors());

/*
app.use('/posts', () => {
    console.log('This is a middle ware running');
});
*/


// Import Routes
const postsRoutes = require('./routes/posts');

app.use('/posts', postsRoutes);


// ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');
});


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Server Listening
app.listen(3000);