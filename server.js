const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.set('Content-Type', 'application/json');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TodoRouter = require('./routes/TodoRouter');
app.use('/api', TodoRouter);

app.get('/', (req, res) => {
    res.redirect('/api/todo')
})

mongoose.connect('mongodb://localhost:27017/todos')
    .then(() => { 
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    })
    .catch(error => console.error(error));



