using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace roosterapi.Models
{
    public class WeatherItem : DatabaseItemBase
    {
        [BsonElement("Name")]
        public string WeatherItemName { get; set; }

        [BsonElement("Latitude")]
        public float WeatherItemLatitude { get; set; }

        [BsonElement("Longitude")]
        public float WeatherItemLongitude { get; set; }
    }
}

