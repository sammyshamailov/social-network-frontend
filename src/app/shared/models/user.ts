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

export interface RegisterDetails {
    email: string;
    username: string;
    password: string;
    avatarUrl?: string;
}
