using CarRentalFullstack.Models;
using CarRentalFullstack.Models.Enums;
using CarRentalFullstack.Models.ResultModel;
using CarRentalFullstack.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;

namespace CarRentalFullstack.Controllers
{
    [Route("api/cars")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;
        private readonly ILogger<CarController> _logger;

        public CarController(ICarService carService, ILogger<CarController> logger)
        {
            _carService = carService;
            _logger = logger;
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> AddCar([FromBody] Car car)
        {
            var result = await _carService.AddCarAsync(car);

            if (result.HasError)
            {
                var error = result.Error;
                return BadRequest(new { error });
            }

            return Ok(result.Value);
        }

        [HttpGet]
        public async Task<ActionResult<List<Car>>> GetAllCars()
        {
            var result = await _carService.GetCarsAsync();

            if (result.HasError)
            {
                var error = result.Error;
                return NotFound(new { error });
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "admin, customer")]
        [HttpGet("{carId}")]
        public async Task<ActionResult<Car>> GetCarById(string carId)
        {
            var result = await _carService.GetCarByIdAsync(carId);

            if (result.HasError)
            {
                var error = result.Error;
                return NotFound(new { error });
            }

            return Ok(result.Value);
        }

        [HttpGet("country/{country}")]
        public async Task<ActionResult<IEnumerable<Car>>> GetCarsByCountryCode(CountryCode country)
        {
            var result = await _carService.GetCarsByCountryCodeAsync(country);

            if (result.HasError)
            {
                var error = result.Error;
                return NotFound(new { error });
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateCar([FromBody] Car car)
        {
            var result = await _carService.UpdateCarAsync(car);

            if (result.HasError)
            {
                var error = result.Error;
                return BadRequest(new { error });
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{carId}")]
        public async Task<IActionResult> DeleteCar(string carId)
        {
            var result = await _carService.DeleteCarAsync(carId);

            if (result.HasError)
            {
                var error = result.Error;
                return BadRequest(new { error });
            }

            return Ok();
        }
    }
}


