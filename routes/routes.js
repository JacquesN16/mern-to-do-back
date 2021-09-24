const userRoutes = require('./todos');
const cors = require('cors');

const appRouter = (app, fs) => {

    app.use(cors());
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  userRoutes(app, fs);
};


module.exports = appRouter;