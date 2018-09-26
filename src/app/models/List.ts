export interface List {
    id?: string;
    title?: string;
    info?: string;
    date?: string;
    tasks?: [
        {
            id?: string;
            title?: string;
            deadline?: string;
            status?: boolean;
        }
    ]
}