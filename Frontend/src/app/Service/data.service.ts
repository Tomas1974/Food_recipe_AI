import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import {recipeModel, ResponseDto} from "./models";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  message: string="";
  translateMessage: string="";
  recipeName: string="";


  constructor(private readonly http: HttpClient ) { }


  async sendInfo()
  {

    let recipeModel:recipeModel = {
      id: 1,
      name: this.recipeName,
      text: this.message
    }

    var req = this.http.post<ResponseDto<recipeModel>>(environment.baseUrl+'/create',
      recipeModel);
    var response =await firstValueFrom<ResponseDto<recipeModel>>(req);

    recipeModel=response.responseData;
    this.translateMessage=recipeModel.text;


  }



}
