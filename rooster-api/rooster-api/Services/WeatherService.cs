using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using roosterapi.Models;
using roosterapi.Models.Weather;

namespace roosterapi.Services
{
    public class WeatherService : DatabaseServiceBase<WeatherItem>
    {
        public WeatherService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _databaseItems = database.GetCollection<WeatherItem>(settings.CollectionName);
        }
    }
}
