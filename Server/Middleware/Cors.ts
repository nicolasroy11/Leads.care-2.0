import { Middleware, Req, Res } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';

@Middleware()
export class Cors {
    use(@Req() req: Request, @Res() res: Response, next?: NextFunction): any {
        res.header("Access-Control-Allow-Headers", "Origin, Client-Timezone-Offset, Content-Type, Accept, Token");
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Options are handled handled in Main.ts, but this covers all cases
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
            res.end();
        } else {
            next();
        }
    }
}
