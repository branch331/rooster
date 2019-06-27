using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace roosterapi.Models
{
    public class WeatherItem : DatabaseItemBase
    {
        [BsonElement("Name")]
        public string WeatherItemName { get; set; }

        [BsonElement("Location")]
        public string WeatherItemLocation { get; set; }
    }
}
