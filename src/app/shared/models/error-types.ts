export enum ErrorTypes {
    notTheOwner = 'Not the owner',
    tweetNotFound = 'Tweet not found or has been deleted already',
    unauthorized = 'Unauthorized',
    badIdFormat = 'Bad id format',
    noMember = 'Member not found',
    emailExists = 'Email already exists',
    usernameExists = 'Username already exists',
    badPasswordFormat = 'Bad password format',
    invalidCred = 'Username or email incorrect',
    badEmailFormat = 'Bad email format',
    serverError = 'Something went wrong in server'
}
