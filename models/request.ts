import { Schema, Document, model} from 'mongoose';

const requestSchema = new Schema({

    reference: {
        type: String,
        required: [true, 'the reference is necessary']
    },
    phone: {
        type: Number,
        required: [true, 'the phone is necessary']
    },
    address: {
        type: String,
        required: [true, 'the address is necessary']
    },
    city: {
        type: String,
        required: [true, 'the city is necessary']
    },
    department: {
        type: String,
        required: [true, 'the department is necessary']
    },
    state: {
        type: String,
        required: [true, 'the department is necessary']
    },
    costumer: {
        type: Schema.Types.ObjectId,
        ref: 'Costumer',
        required: [true, 'the costumer is necessary']
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'the service is necessary']
    },
    technical: {
        type: Schema.Types.ObjectId,
        ref: 'Technical',
        required: [true, 'the technical is necessary']
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

requestSchema.pre<Irequest>('save', function( next ) {

    this.created = new Date();
    next();

})

interface Irequest extends Document {
    costumer: number;
    insurance: number;
    reference: number;
    phone: number;
    address: string;
    city: string;
    department: string;
    state: string;
    user: string;
    created: Date;
}

export const Requests = model<Irequest>('Requests', requestSchema);