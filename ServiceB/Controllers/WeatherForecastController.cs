using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using IdentityModel.Client;

namespace ServiceB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            _logger = logger;
            _clientFactory = clientFactory;
            _configuration = configuration;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IEnumerable<WeatherForecast>> GetAsync()
        {
            try
            {
                var client = _clientFactory.CreateClient("WeatherClient"); // optional named client

                var tokenResponse = await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
                {
                    Address = _configuration["TestService:OpenIdAddress"],
                    ClientId = _configuration["TestService:ClientId"] ?? "",
                    ClientSecret = _configuration["TestService:ClientSecret"],
                    Scope = _configuration["TestService:Scope"]
                });

                client.SetBearerToken(tokenResponse.AccessToken ?? "");
                var response = await client.GetAsync(_configuration["TestService:Endpoint"] + "/WeatherForecast");
                response.EnsureSuccessStatusCode();

                var contentStream = await response.Content.ReadAsStreamAsync();
                if(contentStream is null) return Enumerable.Empty<WeatherForecast>();
                return await JsonSerializer.DeserializeAsync<IEnumerable<WeatherForecast>>(
                    contentStream,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    }) ?? Enumerable.Empty<WeatherForecast>();
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "An error occurred getting all countries.");
                throw;
            }

        }
    }
}
