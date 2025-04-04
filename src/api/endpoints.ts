//auth
export const AUTH_REGISTER_POST = "/auth/register";
export const AUTH_LOGIN_POST = "/auth/login";

//social
export const SOCIAL_FRIENDS_SEARCH_POST = "/social/friends/search";
export const SOCIAL_FRIEND_REQUEST_POST = "/social/friends/requests";
export const SOCIAL_PENDING_REQUESTS_GET = "/social/friends/requests/pending";
export const SOCIAL_ACCEPTED_REQUESTS_GET = "/social/friends/requests/accepted";
export const SOCIAL_ACCEPT_REQUEST_POST = "/social/friends/requests/accept";
export const SOCIAL_REJECT_REQUEST_POST = "/social/friends/requests/reject";

//chat
export const CHAT_MESSAGE_CREATE_POST = "/chat/message/create";
export const CHAT_MESSAGE_FETCH_POST = "/chat/message/fetch";
export const LATEST_SINGLE_CHAT_MESSAGES = "/chat/message/fetch/latest";

//additional routes
export const SILENT_LOGIN_POST = "/silent/login";

//preference route
export const PREF_PROFILE_SIGNATURE_GET = "/preference/profile/signature"; //Remainder: need backend update as signature can be made generic
export const PREF_PROFILE_IMAGE_POST = "/preference/profile/image";
