const http = require('../src/server');

const port = 2000;

http.listen(port, () => console.log(`Example app listening on port ${port}!`));
