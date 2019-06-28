using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace roosterapi.Models
{
    public class DatabaseItemBase : IDatabaseItemBase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }

    public interface IDatabaseItemBase
    {
        string Id { get; set; }
    }
}
