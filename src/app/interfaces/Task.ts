export interface Task {
    id: string;
    listID: string;
    title: string;
    deadline?: any;
    status: boolean;
    userID: string;
    statusIcon?: string;
    createDate?: any
}

