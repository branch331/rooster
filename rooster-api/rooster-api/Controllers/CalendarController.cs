using roosterapi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using roosterapi.Models;

namespace roosterapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly CalendarItemService _calendarItemService;

        public CalendarController(CalendarItemService calendarItemService)
        {
            _calendarItemService = calendarItemService;
        }

        [HttpGet]
        public ActionResult<List<CalendarItem>> Get() => _calendarItemService.Get();

        [HttpGet("{id:length(24)}", Name = "GetCalendarItem")]
        public ActionResult<CalendarItem> Get(string id)
        {
            var calendarItem = _calendarItemService.Get(id);

            if (calendarItem == null)
            {
                return NotFound();
            }

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
    }
}
