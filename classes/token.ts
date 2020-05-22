import jwt from 'jsonwebtoken';

export default class Token {

    private static secret: string = "deivid3013901254rr";
    private static expiration: string = "30d";

    constructor() {}

    static getJwtToken( payLoad: any ): string {

        return jwt.sign({
            usuario: payLoad
        }, this.secret, { expiresIn: this.expiration });

    }

    static checkToken( userToken: string ) {

        return new Promise( (resolve, reject) => {

            jwt.verify( userToken, this.secret, ( err, decoded ) => {

                if ( err ) {
                    reject();
                }else {
                    resolve( decoded );
                }

            } )

        } )

    }

}