using System;
namespace roosterapi.Models
{
    public class DashboardDatabaseSettings : IDashboardDatabaseSettings
    {
        public string DashboardItemsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IDashboardDatabaseSettings
    {
        string DashboardItemsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
