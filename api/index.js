const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
dotenv.config();
const User = require('./models/User');
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true 

}).then(console.log('connected to mongo')).catch(err => console.log(err));
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})