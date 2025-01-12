﻿using MongoDB.Driver;
using roosterapi.Models;

namespace roosterapi.Services
{
    public class WeatherService : DatabaseServiceBase<WeatherItem>
    {
        public WeatherService(IWeatherDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _databaseItems = database.GetCollection<WeatherItem>(settings.CollectionName);
        }
    }
}

