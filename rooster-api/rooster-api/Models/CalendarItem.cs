using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Google.Apis.Calendar.v3.Data;

namespace roosterapi.Models
{
    public class CalendarItem : DatabaseItemBase
    {
        [BsonElement("Name")]
        public string CalendarItemName { get; set; }

        [BsonElement("TimeMin")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime CalendarItemTimeMin { get; set; }

        [BsonElement("TimeMax")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime CalendarItemTimeMax { get; set; }

        [BsonElement("EventList")]
        public List<Event> CalendarItemEventList { get; set; }
    }
}
    