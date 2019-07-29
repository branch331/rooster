using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using roosterapi.Models;

namespace roosterapi.Models
{
    public class CalendarItem : DatabaseItemBase
    {
        [BsonElement("Name")]
        public string CalendarItemName { get; set; }

        [BsonElement("EventTimeRange")]
        public double CalendarItemTimeRange { get; set; }

        [BsonElement("EventList")]
        public List<RoosterEvent> CalendarItemEventList { get; set; }
    }
}
    