using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace roosterapi.Models
{
    public class DashboardItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string DashboardItemName { get; set; }

        [BsonElement("Type")]
        public string DashboardItemType { get; set; }

        [BsonElement("ReferenceId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string DashboardItemReferenceId { get; set; }
    }
}

