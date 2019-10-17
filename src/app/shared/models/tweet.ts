export interface Tweet {
    _id: string;
    text: string;
    userId: string;
    username: string;
    postDate: string;
    stars: number;
    starredByMe: boolean;
    avatarUrl: string;
}

export interface TweetText {
    text: string;
}

export interface TweetStars {
    stars: number;
    starredByMe: boolean;
}