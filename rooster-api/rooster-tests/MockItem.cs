using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using roosterapi.Models;

namespace roostertests
{
    public class MockItem : DatabaseItemBase
    { 
        [BsonElement("Name")]
        public string MockItemName { get; set; }

        [BsonElement("Description")]
        public string MockItemDescription { get; set; }
    }
}


