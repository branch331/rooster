using MongoDB.Driver;
using roosterapi.Models;

namespace roosterapi.Services
{
    public class CommuteService : DatabaseServiceBase<CommuteItem>
    {
        public CommuteService(ICommuteDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _databaseItems = database.GetCollection<CommuteItem>(settings.CollectionName);
        }
    }
}
