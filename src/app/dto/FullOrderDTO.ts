import { OrderDTO } from './OrderDTO';
import { RegionDTO } from './RegionDTO';
import { FullCustomerDTO } from './FullCustomerDTO';

export interface FullOrderDTO{
    area : number,
    id : number,
    region : RegionDTO,
    customer : FullCustomerDTO
}