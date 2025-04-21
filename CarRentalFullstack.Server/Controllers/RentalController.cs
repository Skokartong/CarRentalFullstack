using CarRentalFullstack.Models;
using CarRentalFullstack.Models.Enums;
using CarRentalFullstack.Server.Models.DTOs;
using CarRentalFullstack.Services;
using CarRentalFullstack.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json.Serialization;

namespace CarRentalFullstack.Controllers
{
    [Route("api/rentals")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly IRentalService _rentalService;
        private readonly ILogger<RentalController> _logger;

        public RentalController(IRentalService rentalService, ILogger<RentalController> logger)
        {
            _rentalService = rentalService;
            _logger = logger;
        }


        [AllowAnonymous]
        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableCars([FromQuery] CountryCode country, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var result = await _rentalService.GetAvailableCarsAsync(country, startDate, endDate);

            if (result.HasError)
            {
                return NotFound(new { result.Error });
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<ActionResult<List<Rental>>> GetAllRentals()
        {
            var result = await _rentalService.GetRentalsAsync();

            if (result.HasError)
            {
                var error = result.Error;
                return BadRequest(new { error });
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("{rentalId}")]
        public async Task<ActionResult<Rental>> GetRentalById(string rentalId)
        {
            var result = await _rentalService.GetRentalByIdAsync(rentalId);

            if (result.HasError)
            {
                var error = result.Error;
                return NotFound(new { error });
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "admin, customer")]
        [HttpPost]
        public async Task<IActionResult> AddRental([FromBody] CreateUpdateRentalDTO rental)
        {
            var result = await _rentalService.AddRentalAsync(rental);

            if (result.HasError)
            {
                var error = result.Error;
                return BadRequest(new { error });
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("country/{country}")]
        public async Task<IActionResult> GetRentalsByCountry(CountryCode country)
        {
            var result = await _rentalService.GetRentalsByCountryAsync(country);

            if (result.HasError)
            {
                var error = result.Error;
                return NotFound(new { error });
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("cars/{carId}")]
        public async Task<IActionResult> GetRentalsByCarId(string carId)
        {
            var result = await _rentalService.GetRentalsByCarIdAsync(carId);

            if (result.HasError)
            {
                var error = result.Error;
                return NotFound(new { error });
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "admin, customer")]
        [HttpPut]
        public async Task<IActionResult> UpdateRental(string rentalId, [FromBody] CreateUpdateRentalDTO rental)
        {
            var result = await _rentalService.UpdateRentalAsync(rentalId, rental);

            if (result.HasError)
            {
                var error = result.Error;
                return BadRequest(new { error });
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "admin, customer")]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetRentalsByCustomerId(string userId)
        {
            var result = await _rentalService.GetRentalsByCustomerIdAsync(userId);
            
            if (result.HasError)
            {
                var error = result.Error;
                return NotFound(new { error });
            }
            return Ok(result.Value);
        }

        [Authorize(Roles = "admin, customer")]
        [HttpDelete("{rentalId}")]
        public async Task<IActionResult> DeleteRental(string rentalId)
        {
            var result = await _rentalService.DeleteRentalAsync(rentalId);

            if (result.HasError)
            {
                var error = result.Error;
                return BadRequest(new { error });
            }

            return Ok();
        }
    }
}
