using roosterapi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using roosterapi.Models.Weather;

namespace roosterapi.Controllers
{
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService _weatherService;

        public WeatherController(WeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet("{id:length(24)}", Name = "GetWeatherItem")]
        public ActionResult<WeatherItem> Get(string id)
        {
            var weatherItem = _weatherService.Get(id);

            if (weatherItem == null)
            {
                return NotFound();
            }

            return weatherItem;
        }

        [HttpPost]
        public ActionResult<WeatherItem> Create([FromBody] WeatherItem weatherItem)
        {
            _weatherService.Create(weatherItem);

            return CreatedAtRoute("GetWeatherItem", new { id = weatherItem.Id.ToString(), weatherItem });
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, [FromBody] WeatherItem weatherItemIn)
        {
            var weatherItem = _weatherService.Get(id);

            if (weatherItem == null)
            {
                return NotFound();
            }

            _weatherService.Update(id, weatherItemIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var weatherItem = _weatherService.Get(id);

            if (weatherItem == null)
            {
                return NotFound();
            }

            _weatherService.Remove(id);

            return NoContent();
        }
    }
}
