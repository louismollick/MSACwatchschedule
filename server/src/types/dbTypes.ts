/* eslint-disable no-unused-vars */
import {Document} from 'dynamoose/dist/Document';

// Types used in models
export enum DayOfWeek {
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY'
}
export interface PartyDocument extends Document {
  id: number,
  name: string,
  description?: string,
  currEp: number,
  totalEp: number,
  malId: number,
  image?: string,
  emoji: string,
  // days: Set<DayOfWeek>,
}

export interface UserDocument extends Document {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  // parties: Set<PartyDocument>;
  accessToken: string;
  refreshToken: string;
  tokenIssueDate: Date;
}

// Subset of db User properties that can be safely sent back to the client
export type MSACUser = Pick<UserDocument, 'id' | 'username' | 'discriminator' | 'avatar'>;

