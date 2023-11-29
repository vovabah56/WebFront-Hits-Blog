const express = require('express');
const path = require('path');

const application = express();

application.use('/public', express.static(path.resolve(__dirname, "public")));


application.use('/libs', express.static(path.resolve(__dirname, 'libs')));
application.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname,  './index.html'));
});

application.listen(8002, () =>
    console.log('Сервер запущен: http://localhost:8002/'));