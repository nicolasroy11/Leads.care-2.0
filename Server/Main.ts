import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import * as express from 'express';
import { Database } from './Framework/Database';

let DB = new Database();
DB.Initialize();

let application: express.Express = createExpressServer({
    routePrefix: '/api',
    controllers: [__dirname + '/Controllers/*.js'],
    developmentMode: false,
    errorOverridingMap: {
        ValidationError: {
            Title: 'Validation Error',
            Message: 'The request failed due to one or more validation errors.'
        }
    }
});

// Cross Origin middleware for options
application.use((req, res) => {
    if ( req.method === 'OPTIONS' ) {
        res.header("Access-Control-Allow-Headers", "Origin, Client-Timezone-Offset, Content-Type, Accept, Token");
        res.header("Access-Control-Allow-Origin", "*");
        res.end();
    }
});

// application.get('/', function (req, res) {
//     res.send('hello leads!');
// });

application.listen(3000);
