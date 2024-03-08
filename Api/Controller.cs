using Api;
using Api.TransferModel;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;

namespace Api;

[ApiController]
public class Controller : ControllerBase
{
    private readonly RecipeService _recipeService;


    private readonly Translator _translator;


    public Controller(RecipeService recipeService, Translator translator)
    {
        _recipeService = recipeService;
        _translator = translator;
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
            MessageToClient = "Successfully got all recipes",

            ResponseData = _recipeService.GetAllRecipes()
        };
    }


    /*
     * Get a specific recipe from the database.
     */

    [HttpGet]
    [Route("/get/recipe/{id}")]
    public ResponseDTO GetARecipe([FromRoute] int id)
    {
        return new ResponseDTO()
        {
            MessageToClient = "Successfully got the recipe",
            ResponseData = _recipeService.GetARecipe(id)
        };
    }


    /*
     * Creates a new recipe in the database.
     */
    [HttpPost]
    [Route("/create")]
    public async Task<ResponseDTO> PostRecipe([FromBody] RecipeModel recipe)
    {
        recipe = await _translator.TranslateMessage(recipe);
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
        return new ResponseDTO()
        {
            MessageToClient = "Successfully deleted recipe"
        };
    }
}