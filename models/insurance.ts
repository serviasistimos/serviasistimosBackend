import { Schema, Document, model} from 'mongoose';

const insuranceSchema = new Schema({

    nameInsurance: {
        type: String,
        required: [true, 'the name Insurance is necessary']
    }
});

interface IInsurance extends Document {
    nameInsurance: string;
}

export const Insurance = model<IInsurance>('Insurance', insuranceSchema);