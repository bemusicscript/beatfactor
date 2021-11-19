export interface Response<T> {
  responseCode: number;
  responseMessage: string;
  responseData?: T;
}