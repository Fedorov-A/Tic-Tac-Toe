const https = require('./server');
const logger = require('./lib/logger');

const port = 2000;

https.listen(port, () => logger.log(`Example app listening on port ${port}!`));
