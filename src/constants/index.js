export const ACCESS_TOKEN = 'accessToken';
// export const API_BASE_URL = 'http://www.moodcanvas.site:8080';
// export const OAUTH2_REDIRECT_URI = 'http://www.moodcanvas.site:8080/oauth2'
export const API_BASE_URL = 'https://www.moodcanvas.site';
export const OAUTH2_REDIRECT_URI = 'https://www.moodcanvas.site/oauth2'


export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL = API_BASE_URL + '/oauth2/authorize/kakao?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const NAVER_AUTH_URL = API_BASE_URL + '/oauth2/authorize/naver?redirect_uri=' + OAUTH2_REDIRECT_URI;
