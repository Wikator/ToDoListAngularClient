import { Category } from "../category";
import { Group } from "../group";
import {Subject} from "../subject";

export interface Task {
  id: number;
  name: string;
  description: string | null;
  deadline: Date | null;
  category: Category;
  subject: Subject | null;
  group: Group | null;
}
