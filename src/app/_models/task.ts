export interface Task {
  id: number;
  name: string;
  description: string | null;
  deadline: Date | null;
  categoryId: number;
  subjectId: number | null;
  groupId: number | null;
}
