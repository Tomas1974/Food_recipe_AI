using System.ComponentModel.DataAnnotations;

namespace DefaultNamespace;

public class RecipeService
{
    private readonly Repository _repository;

    public RecipeService(Repository repository)
    {
        _repository = repository;
    }

    /*
     * Retrieves all recipes.
     */
    public IEnumerable<RecipeModel> GetAllRecipes()
    {
        try
        {
            return _repository.GetAllRecipes();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new ValidationException("Error in getting all recipes");
        }
    }

    /*
     * Creates a new Recipe.
     */
    public RecipeModel CreateRecipe(RecipeModel recipe)
    {
        if (!ReferenceEquals(_repository.CheckIfNameExist(recipe.name), null))
            throw new ValidationException("Already exists");
        try
        {
            return _repository.CreateRecipe(recipe);
        }
        catch (Exception e)
        {
            throw new ValidationException("Error in creating a recipe");
        }
    }

    /*
     * Deletes a Recipe by ID.
     */
    public void DeleteRecipe(int id)
    {
        try
        {
            _repository.DeleteRecipe(id);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new ValidationException("Error in deleting a recipe");
        }
    }

    public RecipeModel GetARecipe(int id)
    {
        try
        {
            return _repository.GetARecipe(id);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.StackTrace);
            throw new ValidationException("Error in getting the recipe");
        }
    }
}