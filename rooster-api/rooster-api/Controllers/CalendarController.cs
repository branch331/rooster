using System;
using roosterapi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using roosterapi.Models;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;

namespace roosterapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly CalendarItemService _calendarItemService;
        private readonly RoosterCalendarService _roosterCalendarService; //Used for Google requests

        public CalendarController(CalendarItemService calendarItemService, RoosterCalendarService roosterCalendarService)
        {
            _calendarItemService = calendarItemService;
            _roosterCalendarService = roosterCalendarService;
        }

        [HttpGet]
        public ActionResult<List<CalendarItem>> Get() 
        {
            //**/PLACED IN THIS METHOD FOR DEBUGGING ONLY**
            /* 
            List<Event> myEvents = _roosterCalendarService.getGoogleCalendarEvents(System.DateTime.Now, System.DateTime.Now.AddDays(3));
            Console.WriteLine("Upcoming events:");
            if (myEvents != null && myEvents.Count > 0)
            {
                foreach (var eventItem in myEvents)
                {
                    string when = eventItem.Start.DateTime.ToString();
                    if (String.IsNullOrEmpty(when))
                    {
                        when = eventItem.Start.Date;
                    }
                    Console.WriteLine("{0} ({1})", eventItem.Summary, when);
                }
            }
            else
            {
                Console.WriteLine("No upcoming events found.");
            }

            */
            List<CalendarItem> originalCalendarItemList = _calendarItemService.Get();
            List<CalendarItem> newCalendarItemList = new List<CalendarItem>();

            foreach (CalendarItem calendarItem in originalCalendarItemList)
            {
                CalendarItem calendarItemToAdd = calendarItem;
                calendarItemToAdd.CalendarItemEventList = GetEventsFromGoogle(calendarItem.CalendarItemTimeMin, calendarItem.CalendarItemTimeMax);
                newCalendarItemList.Add(calendarItem);
                _calendarItemService.Update(calendarItemToAdd.Id, calendarItemToAdd);
            }

            return newCalendarItemList;
        } 

        [HttpGet("{id:length(24)}", Name = "GetCalendarItem")]
        public ActionResult<CalendarItem> Get(string id)
        {
            var calendarItem = _calendarItemService.Get(id);

            if (calendarItem == null)
            {
                return NotFound();
            }

            calendarItem.CalendarItemEventList = GetEventsFromGoogle(calendarItem.CalendarItemTimeMin, calendarItem.CalendarItemTimeMax);
            _calendarItemService.Update(id, calendarItem);

            return calendarItem;
        }

        [HttpPost]
        public ActionResult<CalendarItem> Create([FromBody] CalendarItem calendarItem)
        {
            _calendarItemService.Create(calendarItem);

            return CreatedAtRoute("GetCalendarItem", new { id = calendarItem.Id.ToString() }, calendarItem);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, [FromBody] CalendarItem calendarItemIn)
        {
            var calendarItem = _calendarItemService.Get(id);

            if (calendarItem == null)
            {
                return NotFound();
            }

            _calendarItemService.Update(id, calendarItemIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var calendarItem = _calendarItemService.Get(id);

            if (calendarItem == null)
            {
                return NotFound();
            }

            _calendarItemService.Remove(id);

            return NoContent();
        }

        public List<RoosterEvent> GetEventsFromGoogle(DateTime timeMin, DateTime timeMax)
        {
            List<RoosterEvent> roosterEventList = new List<RoosterEvent>();
            List<Event> myEvents = _roosterCalendarService.getGoogleCalendarEvents(timeMin, timeMax);
            
            foreach (var eventItem in myEvents)
            {
                roosterEventList.Add(
                    new RoosterEvent(
                        eventItem.Summary, 
                        eventItem.Location, 
                        eventItem.Start.DateTime ?? DateTime.Now, 
                        eventItem.End.DateTime ?? DateTime.Now.AddDays(1)
                    )
                );
            }
            /* 
            Console.WriteLine("Upcoming events:");

            if (myEvents != null && myEvents.Count > 0)
            {
                foreach (var eventItem in myEvents)
                {
                    string when = eventItem.Start.DateTime.ToString();
                    if (String.IsNullOrEmpty(when))
                    {
                        when = eventItem.Start.Date;
                    }
                    Console.WriteLine("{0} ({1})", eventItem.Summary, when);
                }
            }
            else
            {
                Console.WriteLine("No upcoming events found.");
            }

            */
            return roosterEventList;
        }
    }
}
