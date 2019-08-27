export interface IToDoEntry {
    completed: boolean;
    creationDate: Date;
    description: string;
    dueDate?: Date;
    id: string;
    tags: string[];
}
