import { Schema, Document, model} from 'mongoose';

const technicalSchema = new Schema({

    nameTechnical: {
        type: String,
        required: [true, 'the name Technical is necessary']
    },
    lastNameTechnical: {
        type: String,
        required: [true, 'the last Name Technical is necessary']
    },
    document: {
        type: Number,
        required: [true, 'the document is necessary']
    },
    email: {
        type: String,
        required: [true, 'the email is necessary']
    },
    phone: {
        type: Number,
        required: [true, 'the phone is necessary']
    },
    specialty: {
        type: String,
        required: [true, 'the specialty is necessary']
    },
    numberBill: {
        type: Number,
        required: [true, 'the numberBill is necessary']
    },
    bank: {
        type: String,
        required: [true, 'the bank is necessary']
    }
});

interface Itechnical extends Document {
    nameTechnical: string;
    lastNameTechnical: string;
    document: number;
    email: string;
    phone: number;
    specialty: string;
    numberBill: number;
    bank: string;
}

export const Technical = model<Itechnical>('Technical', technicalSchema);