using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace roosterapi.Models
{
    public class CalendarItem : DatabaseItemBase
    {
        [BsonElement("Name")]
        public string CalendarItemName { get; set; }

        [BsonElement("CalendarName")]
        public string CalendarItemCalendar { get; set; }
    }
}
    