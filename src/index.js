const app = require('./server');
const logger = require('./lib/logger');

const port = 3000;

app.listen(port, () => logger.log(`Example app listening on port ${port}!`));
