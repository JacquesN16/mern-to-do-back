const { v4: uuidv4 } = require('uuid');

const userRoutes = (app, fs) => {
    const dataPath = './data/todos.json';

    const readFile = (
      callback,
      returnJson = false,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
          throw err;
        }
        callback(returnJson ? JSON.parse(data) : data);
      });
    };
  
    const writeFile = (
      fileData,
      callback,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.writeFile(filePath, fileData, encoding, err => {
        if (err) {
          throw err;
        }
  
        callback();
      });
    };
  
    // READ
    app.get('/todos', (req, res) => {
      readFile(data => {
        res.send(data);
      }, true);
    });

    // CREATE
    app.post('/todos', (req, res) => {
    readFile(data => {
     // const newTodoId = uuidv4(req.body.id);
      // add the new todo
    //req.body.id = newTodoId.toString();
    //data[newTodoId.toString()] = req.body;
    data = req.body;
  
      writeFile(JSON.stringify(data, null , 2), () => {
        res.status(200).send('new todo added');
      });
    }, true);
    });

    // DELETE
    app.delete('/todos/:id', (req, res) => {
    readFile(data => {
      
      const todoId = req.params['id'];
      const dataClean = data.filter(x => !!x);
      const todoTarget = dataClean.find(x => x.id === todoId);
      const index = data.indexOf(todoTarget);
      console.log(index);
      delete data[index];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`todos id:${todoId} removed`);
      });
    }, true);
    });



};
  
  module.exports = userRoutes;
  
  module.exports = userRoutes;