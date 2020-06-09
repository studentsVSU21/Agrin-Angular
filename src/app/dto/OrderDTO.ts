import {CustomerDTO} from './CustomerDTO';

export interface OrderDTO {
    customer : CustomerDTO,
    area : number,
    regionID : number,
    date : Date
}