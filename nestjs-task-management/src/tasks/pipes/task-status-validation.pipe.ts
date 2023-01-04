import { BadRequestException } from '@nestjs/common/exceptions';
import { PipeTransform } from '@nestjs/common/interfaces';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];
  transform(value: any) {
    if (!this.isValidatedStatus(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  isValidatedStatus(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
