import { FullOrderDTOWithStatus } from './FullOrderDTOWithStatus';
import { Progress } from '../entities/progress';

export interface DetailOrderDTO {
    infoOrder : FullOrderDTOWithStatus,
    progress : Progress
}