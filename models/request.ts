import { Schema, Document, model} from 'mongoose';

const requestSchema = new Schema({

    assistance: {
        type: String,
        required: [true, 'the assistance is necessary']
    },
    phone: {
        type: Number,
        required: [true, 'the phone is necessary']
    },
    address: {
        type: String,
        required: [true, 'the address is necessary']
    },
    economicMovement: {
        type: String,
        required: [true, 'the economicMovement is necessary']
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
        required: [true, 'the state is necessary']
    },
    costumer: {
        type: Schema.Types.ObjectId,
        ref: 'Costumer',
        required: [true, 'the costumer is necessary']
    },
    nameCostumer: {
        type: String,
        required: [true, 'the nameCostumer is necessary']
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'the service is necessary']
    },
    nameService: {
        type: String,
        required: [true, 'the nameService is necessary']
    },
    technical: {
        type: Schema.Types.ObjectId,
        ref: 'Technical',
        required: [true, 'the technical is necessary']
    },
    nameTechnical: {
        type: String,
        required: [true, 'the nameTechnical is necessary']
    },
    lastnameTechnical: {
        type: String,
        required: [true, 'the lastnameTechnical is necessary']
    },
    insurance: {
        type: Schema.Types.ObjectId,
        ref: 'Insurance',
        required: [true, 'the insurance is necessary']
    },
    nameInsurance: {
        type: String,
        required: [true, 'the nameInsurance is necessary']
    },
    commentary: {
        type: String,
        required: [true, 'the commentary is necessary']
    },
    materials: {
        type: String,
        required: [true, 'the materials is necessary']
    },
    bill: {
        type: String,
        required: [true, 'the bill is necessary']
    },
    valueMaterials: {
        type: Number,
        required: [true, 'the value Materials is necessary']
    },
    workforce: {
        type: Number,
        required: [true, 'the value workforce is necessary']
    },
    valueAsistimos: {
        type: Number,
        required: [true, 'the value Asistimos is necessary']
    },
    valueCostumer: {
        type: Number,
        required: [true, 'the value Costumer is necessary']
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
    commentary: string;
    assistance: number;
    economicMovement: string;
    phone: number;
    address: string;
    city: string;
    department: string;
    state: string;
    user: string;
    created: Date;
    nameCostumer: string;
    nameService: string;
    nameTechnical: string;
    nameInsurance: string;
    lastnameTechnical: string;
    valueMaterials: number;
    valueAsistimos: number;
    valueCostumer: number;
    materials: string;
    workforce: number;
    bill: string;
}

export const Requests = model<any>('Requests', requestSchema);