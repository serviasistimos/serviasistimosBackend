import { Schema, Document, model} from 'mongoose';

const costumerSchema = new Schema({

    nameCostumer: {
        type: String,
        required: [true, 'the name Costumer is necessary']
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
    }
});

interface Icostumer extends Document {
    nameCostumer: string;
    phone: number;
    address: string;
    city: string;
    department: string;
}

export const Costumer = model<Icostumer>('Costumer', costumerSchema);