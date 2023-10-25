import {Group} from "../group";
import {Subject} from "../subject";
import {Time} from "@angular/common";

export interface SubjectTime {
  id: number;
  subject: Subject;
  group: Group;
  time: Time
}
