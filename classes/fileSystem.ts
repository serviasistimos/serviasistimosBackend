import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {

    constructor() {}

    saveImageTemp( file: any, userId: string ) {

        return new Promise( ( resolve, reject ) => {

        //create folder
        const path = this.createFolderUser( userId );

        //createOriginal name file
        const nameFile = this.createOriginalName( file.name );

        //move file sense temp folder to own folder
        file.mv( `${ path }/${ nameFile }`, ( err: any ) => {

            if ( err ) {

                reject( err );

            } else {

                resolve();

            }

        })

        })

    }

    private createOriginalName( originalName: string ) {

        const nameArr = originalName.split('.');
        const ext = nameArr[ nameArr.length - 1 ];

        const idUnic = uniqid();

        return `${ idUnic }.${ ext }`;

    }

    private createFolderUser( userId: string ) {

        const pathUser = path.resolve( __dirname, '../uploads', userId );
        const pathUserTemp = pathUser + '/temp';
        
        const exist = fs.existsSync( pathUser );

        if ( !exist ) {

            fs.mkdirSync( pathUser );
            fs.mkdirSync( pathUserTemp );

        }

        return pathUserTemp;

    }

}