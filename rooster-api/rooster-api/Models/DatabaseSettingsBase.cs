namespace roosterapi.Models
{
    public class DatabaseSettingsBase : IDatabaseSettings
    {
        public string CollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
