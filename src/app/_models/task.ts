export interface Task {
  name: string;
  description: string | null;
  deadline: Date | null;
  categoryId: number;
  subjectId: number | null;
  groupId: number | null;
}
