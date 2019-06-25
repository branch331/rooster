using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace roosterapi.Models.Dashboard
{
    public class DashboardItem : DatabaseItemBase
    {
        [BsonElement("Name")]
        public string DashboardItemName { get; set; }

        [BsonElement("Type")]
        public string DashboardItemType { get; set; }

        [BsonElement("ReferenceId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string DashboardItemReferenceId { get; set; }
    }
}

