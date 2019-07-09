using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace roosterapi.Models
{
    public class CommuteItem : DatabaseItemBase
    {
        [BsonElement("Name")]
        public string CommuteItemName { get; set; }

        [BsonElement("OriginLatitude")]
        public float CommuteOriginLatitude { get; set; }

        [BsonElement("OriginLongitude")]
        public float CommuteOriginLongitude { get; set; }

        [BsonElement("DestionationLatitude")]
        public float CommuteDestinationLatitude { get; set; }

        [BsonElement("DestinationLongitude")]
        public float CommuteDestiniationLongitude { get; set; }
    }
}
