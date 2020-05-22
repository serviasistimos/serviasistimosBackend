import { Request, Response, NextFunction } from 'express';
import Token from '../classes/token';

export const verifyToken = ( req: any, res: Response, next: NextFunction ) => {

    const userToken = req.get('x-token') || '';

    Token.checkToken( userToken )
         .then( ( decoded: any ) => {

            console.log( 'decoded', decoded );
            req.user = decoded.usuario;
            next();

         }).catch( err => {

            res.json({
                ok: false,
                message: 'token invalid'
            });

         } )

}