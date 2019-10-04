export interface IUser {
    email: string;
    userId: string;
    username: string;
    password: string;
    avatarUrl: string;
    activity: IActivity;
}

export interface IActivity {
    registrationDate: string;
    lastLoginDate: string;
    tweets: string[];
    starred: string[];
}
