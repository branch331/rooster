using roosterapi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace roosterapi.Services
{
    public class DashboardService
    {
        private readonly IMongoCollection<DashboardItem> _dashboardItems;

        public DashboardService(IDashboardDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _dashboardItems = database.GetCollection<DashboardItem>(settings.DashboardItemsCollectionName);
        }

        public List<DashboardItem> Get() =>
            _dashboardItems.Find(dashboardItem => true).ToList();

        public DashboardItem Get(string id) =>
            _dashboardItems.Find<DashboardItem>(dashboardItem => dashboardItem.Id == id).FirstOrDefault();

        public DashboardItem Create(DashboardItem dashboardItem)
        {
            _dashboardItems.InsertOne(dashboardItem);
            return dashboardItem;
        }

        public void Update(string id, DashboardItem dashboardItemIn) =>
            _dashboardItems.ReplaceOne(dashboardItem => dashboardItem.Id == id, dashboardItemIn);

        public void Remove(DashboardItem dashboardItemIn) =>
            _dashboardItems.DeleteOne(dashboardItem => dashboardItem.Id == dashboardItemIn.Id);

        public void Remove(string id) =>
            _dashboardItems.DeleteOne(dashboardItem => dashboardItem.Id == id);
    }
}
