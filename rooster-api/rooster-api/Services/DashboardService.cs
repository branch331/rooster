using MongoDB.Driver;
using roosterapi.Models;

namespace roosterapi.Services
{
    public class DashboardService : DatabaseServiceBase<DashboardItem>
    {
        public DashboardService() { } //Parameterless constructor to Mock in Unit Tests
        public DashboardService(IDashboardDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _databaseItems = database.GetCollection<DashboardItem>(settings.CollectionName);
        }       
    }
}
