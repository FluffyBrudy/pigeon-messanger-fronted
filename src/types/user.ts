import { ACCESS_TOKEN } from "../api/constants";

//probable unused
export interface UserResponse {
  id: string;
  [ACCESS_TOKEN]: string;
}
