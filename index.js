const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const {getAll}=require('./controllers/blog')
const { MONGODB_URI } = process.env; 
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });
const routes = require('./routes');

const app = express();
app.use(cors())
app.use(express.json());
app.use('/',routes)
app.get('/getAll', async (req, res, next) => {
  try {
    const user = await getAll(); 
    res.json(user);
  } catch (e) {
    next(e);
  }
});

app.use('*', (req, res, next) => {
    res.status(404).json({ err: 'NOT_FOUND' });
  });
  app.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(422).json(err.errors);
    }
    if (err.code === 11000) {
      res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    if(err.message==='UN_AUTHENTICATED'){
      res.status(401).json({statusCode:'UN_AUTHENTICATED'})
    }
  });

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log('App is up and ready on:', PORT);
});
