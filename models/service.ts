import { Schema, Document, model} from 'mongoose';

const serviceSchema = new Schema({

    nameService: {
        type: String,
        required: [true, 'the name Service is necessary']
    },
    commentary: {
        type: String,
        required: [false, 'the commentary is necessary']
    },
    created: {
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'the User is necessary']
    }
});

serviceSchema.pre<Iservice>('save', function( next ) {

    this.created = new Date();
    next();

})

interface Iservice extends Document {
    nameService: string;
    valueMaterials: number;
    valueAsistimos: number;
    valueCostumer: number;
    commentary: string;
    created: Date;
    user: string;
}

export const Service = model<Iservice>('Service', serviceSchema);