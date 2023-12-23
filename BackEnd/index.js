const express = require('express');
require('express-async-errors');
const logger = require('./middilewares/logger'); // Middleware dosyanızın yolunu düzeltin
const userRoutes = require('./routers/userRouter');
const todosRouters = require('./routers/todosRouter');
const todoItemsRouter = require('./routers/todo_itemsRouter'); // Rota dosyanızın yolunu düzeltin
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { UnauthorizedError, NotFoundError} = require('./utils/custom-erors')

dotenv.config();
const cors = require('cors');
const morgan = require('morgan');
const app = express();


app.use(bodyParser.json());

app.use(express.json());

app.use(morgan('combined'));
app.use(cors());
app.use(logger);



// Rotaları tanımlayın
app.use('/users', userRoutes);
app.use('/todos', todosRouters);
app.use('/', todoItemsRouter); // Rota dosyanızın yolunu düzeltin


// Hata işleme fonksiyonu
function handleErrors(err, req, res, next) {
  console.log(err);
  if (err instanceof UnauthorizedError) {
    // Yetkisiz erişim hatası
    res.status(401).send('unauthorized');
  } else if (err instanceof NotFoundError) {
    // Sayfa bulunamadı hatası
    res.status(404).send('Not Found');
  } else {
    // Bilinmeyen hata
    res.status(500).send('internal Server Error');
  }
}

// Hata işleme fonksiyonunu uygula
app.use(handleErrors);



app.listen(8080, () => {
  console.log('Sunucu 8080 portunda çalışıyor...');
});
