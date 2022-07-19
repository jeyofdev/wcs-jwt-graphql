export interface IRegisterUserInput {
    registerUserInput: {
        username: string;
        password: string;
        firstname: string;
        lastname: string;
        permission: string;
    };
}
export interface ILoginUserInput {
    loginUserInput: {
        username: string;
        password: string;
    };
}

export interface IUser {
    id: string;
    username: string;
    password: string;
    roles: string[];
    permissions: string[];
}
