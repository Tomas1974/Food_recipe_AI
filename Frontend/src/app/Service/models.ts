export interface recipeModel {
  id: number;
  name: string;
  text: string;
}


export interface ResponseDto<T> {
  messageToClient: string;
  responseData: T;
}
