export type BugType = {
  id: string;
  title: string;
  status: "open" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  created: Date;
  description: string;
}