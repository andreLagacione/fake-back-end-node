const express = require('express')
	, app = express()
	, cors = require('cors')
	, bodyParser = require('body-parser')
	, port = process.env.PORT || 3001
	, corsOptions = {
		origin: true,
		credentials: true
	};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use((_, __, next) => { setTimeout(next, 500); }); // Intentional delay.

app.use('/v1.0', require('./v1.0'));

app.listen(port);

console.log('Magic happening on port: ' + port);
