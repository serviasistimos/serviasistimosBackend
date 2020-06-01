import { Schema, Document, model} from 'mongoose';

const insuranceCostumerSchema = new Schema({

    costumer: {
        type: Schema.Types.ObjectId,
        ref: 'Costumer',
        required: [true, 'the costumer is necessary']
    },
    insurance: {
        type: Schema.Types.ObjectId,
        ref: 'Insurance',
        required: [true, 'the insurance is necessary']
    }
});

interface IinsuranceCostumer extends Document {
    costumer: number;
    insurance: number;
}

export const InsuranceCostumer = model<IinsuranceCostumer>('InsuranceCostumer', insuranceCostumerSchema);