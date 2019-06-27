using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using roosterapi.Models;
using roosterapi.Services;

namespace roostertests
{
    public class MockService : DatabaseServiceBase<MockItem>
    {
        public MockService(IDatabaseSettingsBase settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _databaseItems = database.GetCollection<MockItem>("MockItems");
        }
    }
}
