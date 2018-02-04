import { Middleware, Req, Res } from 'routing-controllers';
import { verify } from 'jsonwebtoken';
import { AppSettings } from '../Settings/AppSettings';
import { NextFunction, Request, Response } from 'express';

@Middleware()
export class TokenValidate {
    use(@Req() request: Request, @Res() response: Response, next?: NextFunction): any {
        verify(request.headers.token, AppSettings.SecretKey, (err: any, decodedToken: any) => {
            if (err) {
                response.status(401);
                return response.send({ title: 'error', message: "Invalid session! Please log in again"});
            } else {
                next();
            }
        });
    }
}
