using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace roosterapi.Models
{
    public class DatabaseItemBase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
