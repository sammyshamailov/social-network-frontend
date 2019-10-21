export interface User {
    email: string;
    _id: string;
    username: string;
    avatarUrl: string;
    registrationDate: string;
    lastLoginDate: string;
}

export interface UserDetails extends User {
    token: string;
}

export interface UserToken {
    _id: string;
    username: string;
}
