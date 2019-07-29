using System;
namespace roosterapi.Models
{
    public class RoosterEvent
    {
        public RoosterEvent(string summary, string location, DateTime startDateTime, DateTime endDateTime)
        {
            Summary = summary;
            Location = location;
            StartDateTime = startDateTime;
            EndDateTime = endDateTime; 
        }

        public string Summary { get; set; }
        public string Location { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}