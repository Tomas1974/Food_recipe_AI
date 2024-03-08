using Dapper;
using Npgsql;

namespace DefaultNamespace;

public class Repository
{
    private readonly NpgsqlDataSource _dataSource;

    public Repository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }

    /*
     * Gets all recipes from the database
     */
    public IEnumerable<RecipeModel> GetAllRecipes()
    {
        var sql = @"SELECT * FROM recipes.all ORDER BY name;";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<RecipeModel>(sql);
        }
    }

    /*
     * Creates a new recipe in the database.
     */
    public RecipeModel CreateRecipe(RecipeModel recipe)
    {
        var sql =
            @" INSERT INTO recipes.all (name, text) VALUES (@name, @text) RETURNING *;";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<RecipeModel>(sql, new { name = recipe.name, text = recipe.text });
        }
    }

    /*
     * Checks if a recipe with the given name exists in the database.
     */
    public RecipeModel CheckIfNameExist(string name)
    {
        var sql = $@"SELECT * FROM recipes.all WHERE name = @name;";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<RecipeModel>(sql, new { name });
        }
    }

    /*
     * Deletes a recipe from the database.
     */
    public void DeleteRecipe(int id)
    {
        var sql =
            @"DELETE FROM recipes.all WHERE id = @id RETURNING *";

        using (var conn = _dataSource.OpenConnection())
        {
            conn.QueryFirst<RecipeModel>(sql, new { id });
        }
    }

    public RecipeModel GetARecipe(int id)
    {
        var sql = @"SELECT * FROM recipes.all WHERE id = @id;";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<RecipeModel>(sql, new { id });
        }
    }
}