using Google.Apis.Auth.OAuth2;

namespace roosterapi.Models
{
    public class GoogleCalendarSettings : IGoogleCalendarSettings
    {
        public string ApplicationName { get; set; }
        public string CalendarName { get; set; }
    }

    public interface IGoogleCalendarSettings
    {
        string ApplicationName { get; set; }
        string CalendarName { get; set; }
    }
}
