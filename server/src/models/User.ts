import * as dynamoose from 'dynamoose';
// import Party from './Party';
import {UserDocument} from '../types/dbTypes';

const UserSchema = new dynamoose.Schema({
  id: {hashKey: true, type: String, required: true},
  username: {type: String, required: true},
  discriminator: {type: String, required: true},
  avatar: {type: String, required: true},
  // parties: {
  //   type: Set,
  //   schema: [Party], // requires Party schema to not have a `rangeKey`
  //   required: true,
  // },
  accessToken: {type: String, required: true},
  refreshToken: {type: String, required: true},
  tokenIssueDate: {type: Date, required: true},
}, {
  timestamps: true,
});

export default dynamoose.model<UserDocument>('User', UserSchema);
