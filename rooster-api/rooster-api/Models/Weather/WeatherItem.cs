using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace roosterapi.Models.Weather
{
    public class WeatherItem : DatabaseItemBase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string WeatherItemName { get; set; }

        [BsonElement("Location")]
        public string WeatherItemLocation { get; set; }
    }
}
