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

        //move file since temp folder to own folder
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

    public imagesSinceTempToPost( userId: any ) {

        const pathTemp = path.resolve( __dirname, '../uploads', userId, 'temp' );
        const pathPost = path.resolve( __dirname, '../uploads', userId, 'posts' );

        if ( !fs.existsSync( pathTemp ) ) {
            return [];
        }

        if ( !fs.existsSync( pathPost ) ) {
            fs.mkdirSync( pathPost );
        }

        const imagesTemp = this.getImagesSinceTemp( userId );

        imagesTemp.forEach( image => {
            fs.renameSync( `${ pathTemp }/${ image }`, `${ pathPost }/${ image }` )
        });

        return imagesTemp;

    }

    private getImagesSinceTemp( userId: any ) {

        const pathTemp = path.resolve( __dirname, '../uploads', userId, 'temp' );

        return fs.readdirSync( pathTemp ) || [];

    }

    getFotoURL( userId: string, img: string ) {

        const pathPhoto = path.resolve( __dirname, '../uploads', userId, 'posts', img );

        const exist = fs.existsSync( pathPhoto );

        if ( !exist ) {
            return path.resolve( __dirname, '../assets/original.jpg' );
        }

        return pathPhoto;

    }

}