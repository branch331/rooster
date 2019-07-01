using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace roosterapi.Models
{
    public class WeatherItem : DatabaseItemBase
    {
        [BsonElement("Name")]
        public string WeatherItemName { get; set; }

        [BsonElement("Coordinates")]
        public string WeatherItemCoordinates { get; set; }
    }
}

