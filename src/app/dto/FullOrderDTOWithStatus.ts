import { FullOrderDTO } from './FullOrderDTO';
import { from } from 'rxjs';

export interface FullOrderDTOWithStatus extends FullOrderDTO {
    status : string
}