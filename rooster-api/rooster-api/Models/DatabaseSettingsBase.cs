namespace roosterapi.Models
{
    public class DatabaseSettingsBase : IDatabaseSettingsBase
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IDatabaseSettingsBase
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
