export interface IUserMessageResponse {
  id: string;
  name: string;
  github_id: number;
  avatar_url: string;
  login: string;
}
export interface IMessageResponse {
  created_at: Date;
  id: string;
  text: string;
  user: IUserMessageResponse;
  user_id: string;
}
