using MongoDB.Driver;
using roosterapi.Models;

namespace roosterapi.Services
{
    public class CalendarItemService : DatabaseServiceBase<CalendarItem>
    {
        public CalendarItemService(ICalendarDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _databaseItems = database.GetCollection<CalendarItem>(settings.CollectionName);
        }
    }
}
