/**
 * This is the interface that represents an entry of our To Do list.
 * It can be used in the type annotations.
 * Prefixing it with `I` is a Typescript convention.
 */
export interface IToDoEntry {
    completed: boolean;
    // JS Date
    creationDate: Date;
    description: string;
    // A question mark after the name indicates that the property is optional, so it could be undefined.
    dueDate?: Date;
    // The ES6 Symbol is capitalized, but its TypeScript primitive data type is lowercase.
    id: symbol;
    // tags is an array of strings.
    tags: string[];
}
