import * as mongoose from 'mongoose';

export interface ILeadSchema extends mongoose.Document {
    LeadId: mongoose.Schema.Types.String,
    Email: mongoose.Schema.Types.String
    Name: mongoose.Schema.Types.String,
    MaxBudget: mongoose.Schema.Types.Number,
    MaxBedrooms: mongoose.Schema.Types.Number,
    Phone: any,
    Status: mongoose.Schema.Types.Number,
    UserId: mongoose.Schema.Types.String,
    Neighborhoods: [mongoose.Schema.Types.String],
    MoveInDate: Date,
    Notes: mongoose.Schema.Types.String
}

const _leadSchema: mongoose.Schema = new mongoose.Schema({
    LeadId: { type: mongoose.Schema.Types.String, unique: true },
    Email: mongoose.Schema.Types.String,
    Name: mongoose.Schema.Types.String,
    Status: mongoose.Schema.Types.Number,
    MaxBudget: mongoose.Schema.Types.Number,
    MaxBedrooms: mongoose.Schema.Types.Number,
    Neighborhoods: [mongoose.Schema.Types.String],
    MoveInDate: Date,
    Phone: {
        AreaCode: mongoose.Schema.Types.Number,
        ExchangeCode: mongoose.Schema.Types.Number,
        SubscriberNumber: mongoose.Schema.Types.Number,
        // FormattedNumber: mongoose.Schema.Types.String
    },
    UserId: mongoose.Schema.Types.String,
    Notes: mongoose.Schema.Types.String
});

_leadSchema.virtual('Phone.FormattedNumber').get(function () {
    return '(' + this.Phone.AreaCode + ')-' + this.Phone.ExchangeCode + '-' + this.Phone.SubscriberNumber;
});

_leadSchema.pre('save', function (next) {
    this.LeadId = this._id.toHexString();
    next();
});

// _leadSchema.pre('findOneAndUpdate', function (next) {
//     this.update({}, { $inc: { __v: 1 } }, next);
// });

_leadSchema.post('save', function () {
});

_leadSchema.set('toJSON', { getters: true, virtuals: true });
_leadSchema.set('toObject', { getters: true, virtuals: true });

export const LeadSchema = mongoose.model<ILeadSchema>('Lead', _leadSchema, 'Lead');
