import {Time} from "@angular/common";

export interface CreateUpdateSubjectTime {
  id: number;
  subject_id: number;
  group_id: number;
  time: Time | null;
}
