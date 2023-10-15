import { Category } from "./category";
import { Group } from "./group";

export interface TaskDetails {
  id: number;
  name: string;
  description: string | null;
  deadline: Date | null;
  category: Category;
  group: Group | null;
}
