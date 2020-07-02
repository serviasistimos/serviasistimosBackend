import { Schema, Document, model} from 'mongoose';

const requestCommentarySchema = new Schema({

    commentary: {
        type: String,
        required: [false, 'the commentary is necessary']
    },
    created: {
        type: Date
    },
    request: {
        type: Schema.Types.ObjectId,
        ref: 'Requests',
        required: [true, 'the User is necessary']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'the User is necessary']
    }
});

requestCommentarySchema.pre<IrequestCommentary>('save', function( next ) {

    this.created = new Date();
    next();

})

interface IrequestCommentary extends Document {
    commentary: string;
    created: Date;
    request: string;
    user: string;
}

export const RequestCommentary = model<IrequestCommentary>('RequestCommentary', requestCommentarySchema);