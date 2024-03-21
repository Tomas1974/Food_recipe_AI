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
  recipesArray: recipeModel[]=[];
  recipesArrayText: string[]=[];
  messageToTextarea: string | undefined = '';
  selectedLine: string = '';

  constructor(private readonly http: HttpClient ) { }


  async sendInfo()
  {

    let recipeModel:recipeModel = {
      id: 1,
      name: this.recipeName,
      text: this.message,

    }

    var req = this.http.post<ResponseDto<recipeModel>>(environment.baseUrl+'/create',
      recipeModel);
    var response =await firstValueFrom<ResponseDto<recipeModel>>(req);

    recipeModel=response.responseData;
    this.translateMessage=recipeModel.text;


  }


  async getAllRecipes()
  {
    var result= await firstValueFrom(this.http.get<ResponseDto<recipeModel[]>>(environment.baseUrl+ "/recipes/all"))
    this.recipesArray=result.responseData;

    for (let i=0; i<this.recipesArray.length;i++ )
    {
          this.recipesArrayText[i]=this.recipesArray[i].name
    }

  }

  messageToDatafield()
  {

    const recipe = this.recipesArray.find(product => product.name === this.selectedLine.trim());
    this.messageToTextarea = recipe?.text;

  }

  async deleteRecipe()
  {

    const recipe = this.recipesArray.find(product => product.name === this.selectedLine.trim());

    await firstValueFrom(this.http.delete<ResponseDto<recipeModel[]>>(environment.baseUrl+ "/recipe/"+recipe?.id));

    this.recipesArrayText = this.recipesArrayText.filter(product => product != this.selectedLine.trim());

    this.selectedLine="";
  }




}
