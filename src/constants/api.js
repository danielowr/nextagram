export const GET_ALL_USERS = 'https://insta.nextacademy.com/api/v1/users'
export const GET_USER_IMAGES = id =>
    `https://insta.nextacademy.com/api/v2/images?userId=${id}`
export const GET_USER_INFO = userId => 
    `https://insta.nextacademy.com/api/v1/users/${userId}`