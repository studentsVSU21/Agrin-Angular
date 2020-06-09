import { Status } from './status';

export interface Progress {
    progressID : number,
    processedArea : Number,
    dateStart : Date,
    dateEnd : Date,
    status : Status
}