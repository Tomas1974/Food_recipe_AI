using System.Text;
using DefaultNamespace;
using Newtonsoft.Json;

public class Translator
{
    private static readonly string key = Environment.GetEnvironmentVariable("azkey");
    private static readonly string endpoint = "https://api.cognitive.microsofttranslator.com";

    private static readonly string location = "northeurope";

    public async Task<RecipeModel> TranslateMessage(RecipeModel recipeModel)
    {
        string route = "/translate?api-version=3.0&from=da&to=en";
        string textToTranslate = recipeModel.text;
        object[] body = new object[] { new { Text = textToTranslate } };
        var requestBody = JsonConvert.SerializeObject(body);

        using (var client = new HttpClient())
        using (var request = new HttpRequestMessage())
        {
            request.Method = HttpMethod.Post;
            request.RequestUri = new Uri(endpoint + route);
            request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
            request.Headers.Add("Ocp-Apim-Subscription-Key", key);
            request.Headers.Add("Ocp-Apim-Subscription-Region", location);

            HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
            string result = await response.Content.ReadAsStringAsync();

            var jsonResponse = JsonConvert.DeserializeObject<List<TranslationResponse>>(result);

            string translatedText = jsonResponse[0].Translations[0].Text;

            recipeModel.text = translatedText;
            return recipeModel;
        }
    }
}

public class TranslationResponse
{
    public List<Translation> Translations { get; set; }
}

public class Translation
{
    public string Text { get; set; }
}