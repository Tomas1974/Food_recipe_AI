using Api;
using Api.TransferModel;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;

namespace Api;

[ApiController]
public class Controller : ControllerBase
{
    
    private readonly RecipeService _recipeService;
    
    public Controller(RecipeService recipeService)
    {
        _recipeService = recipeService;
    }
    
    /*
     * Gets all recipes from the database.
     */
    [HttpGet]
    [Route("/recipe/all")]
    public ResponseDTO GetAllRecipes()
    {
        return new ResponseDTO()
        {
            MessageToClient = "Succesfully got all recipes",
            ResponseData =  _recipeService.GetAllRecipes()
        };
    }
    
    /*
     * Creates a new recipe in the database.
     */
    [HttpPost]
    [Route("/create")]
    public ResponseDTO PostRecipe([FromBody] RecipeModel recipe)
    {
        return new ResponseDTO()
        {
            MessageToClient = "Successfully created a recipe",
            ResponseData = _recipeService.CreateRecipe(recipe)
            
        };
    }
    
    /*
     * Deletes an existing recipe from the database.
     */
    [HttpDelete]
    [Route("/recipe/{id}")]
    public object DeleteRecipe([FromRoute] int id)
    {
        _recipeService.DeleteRecipe(id);
        return  new ResponseDTO()
        {
            MessageToClient = "Succesfully deleted recipe"
        };
    }
    
}