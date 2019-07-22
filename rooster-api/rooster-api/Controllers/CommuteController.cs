using roosterapi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using roosterapi.Models;

namespace roosterapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommuteController : ControllerBase
    {
        private readonly CommuteService _commuteService;

        public CommuteController(CommuteService commuteService)
        {
            _commuteService = commuteService;
        }

        [HttpGet]
        public ActionResult<List<CommuteItem>> Get() => _commuteService.Get();

        [HttpGet("{id:length(24)}", Name = "GetCommuteItem")]
        public ActionResult<CommuteItem> Get(string id)
        {
            var commuteItem = _commuteService.Get(id);

            if (commuteItem == null)
            {
                return NotFound();
            }

            return commuteItem;
        }

        [HttpPost]
        public ActionResult<CommuteItem> Create([FromBody] CommuteItem commuteItem)
        {
            _commuteService.Create(commuteItem);

            return CreatedAtRoute("GetCommuteItem", new { id = commuteItem.Id.ToString() }, commuteItem);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, [FromBody] CommuteItem commuteItemIn)
        {
            var commuteItem = _commuteService.Get(id);

            if (commuteItem == null)
            {
                return NotFound();
            }

            _commuteService.Update(id, commuteItemIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var commuteItem = _commuteService.Get(id);

            if (commuteItem == null)
            {
                return NotFound();
            }

            _commuteService.Remove(id);

            return NoContent();
        }
    }
}
