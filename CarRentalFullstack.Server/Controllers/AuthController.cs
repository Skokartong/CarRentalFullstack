using CarRentalFullstack.Server.Models;
using CarRentalFullstack.Server.Models.DTOs;
using CarRentalFullstack.Server.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarRentalFullstack.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            if (registerDto == null)
            {
                return BadRequest("Invalid registration data");
            }

            var token = await _authService.RegisterAsync(registerDto);

            if (token == null)
            {
                return BadRequest("User registration failed");
            }

            return Ok(new { Token = token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            if (loginDto == null)
            {
                return BadRequest("Invalid login data");
            }

            var token = await _authService.LoginAsync(loginDto);

            if (token == null)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(new { Token = token });
        }
    }
}
