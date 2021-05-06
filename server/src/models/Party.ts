import dynamoose from 'dynamoose';
import {ValueType} from 'dynamoose/dist/Schema';
import {PartyDocument} from '../types/dbTypes';

// TODO add validation so curr_ep <= total_ep
const validateEpisode = (val: ValueType) => val > 0 && val < 9999;

const PartySchema = new dynamoose.Schema({
  id: {type: Number, required: true},
  currEp: {type: Number, required: true, validate: validateEpisode},
  totalEp: {type: Number, required: true, validate: validateEpisode},
  name: {type: String, required: true},
  description: {type: String, default: ''},
  malId: {type: Number, required: true},
  emoji: {type: String, required: true},
  image: {type: String},
  // days: {
  //   type: Set,
  //   schema: [{
  //     type: String,
  //     enum: Object.values(DayOfWeek),
  //   }],
  // },
}, {
  timestamps: true,
});

export default dynamoose.model<PartyDocument>('Party', PartySchema);
