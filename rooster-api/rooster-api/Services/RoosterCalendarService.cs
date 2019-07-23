using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System.Collections.Generic;
using roosterapi.Models;

namespace roosterapi.Services
{
    public class RoosterCalendarService 
    {
        public CalendarService _googleCalendarService;
        public string _calendarName;
        public RoosterCalendarService(UserCredential credential, IGoogleCalendarSettings settings)
        {
            _googleCalendarService = new CalendarService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = settings.ApplicationName,
            });

            _calendarName = settings.CalendarName;
        }

        public List<Event> getGoogleCalendarEvents(System.DateTime timeMin, System.DateTime timeMax)
        {
            var eventList = new List<Event>();

            EventsResource.ListRequest request = _googleCalendarService.Events.List(_calendarName);
                request.TimeMin = timeMin;
                request.TimeMax = timeMax;
                request.ShowDeleted = false;
                request.SingleEvents = true;
                request.OrderBy = EventsResource.ListRequest.OrderByEnum.StartTime;

            Events events = request.Execute();

            foreach (var eventItem in events.Items)
            {
                eventList.Add(eventItem);
            }

            return eventList;
        }
    }
}
