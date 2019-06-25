using roosterapi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using roosterapi.Models.Dashboard;

namespace roosterapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;

        public DashboardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet]
        public ActionResult<List<DashboardItem>> Get() =>
            _dashboardService.Get();

        [HttpGet("{id:length(24)}", Name = "GetDashboardItem")]
        public ActionResult<DashboardItem> Get(string id)
        {
            var dashboardItem = _dashboardService.Get(id);

            if (dashboardItem == null)
            {
                return NotFound();
            }

            return dashboardItem;
        }

        [HttpPost]
        public ActionResult<DashboardItem> Create([FromBody] DashboardItem dashboardItem)
        {
            _dashboardService.Create(dashboardItem);

            return CreatedAtRoute("GetDashboardItem", new { id = dashboardItem.Id.ToString() }, dashboardItem);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, [FromBody] DashboardItem dashboardItemIn)
        {
            var dashboardItem = _dashboardService.Get(id);

            if (dashboardItem == null)
            {
                return NotFound();
            }

            _dashboardService.Update(id, dashboardItemIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var dashboardItem = _dashboardService.Get(id);

            if (dashboardItem == null)
            {
                return NotFound();
            }

            _dashboardService.Remove(id);

            return NoContent();
        }
    }
}
