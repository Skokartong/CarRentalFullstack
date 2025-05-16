using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarRentalFullstack.Server.Models;
using CarRentalFullstack.Server.Models.DTOs;
using CarRentalFullstack.Server.Services.IServices;
using CarRentalFullstack.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace CarRentalFullstack.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<AuthService> _logger;

        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager, ILogger<AuthService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        public async Task<string> RegisterAsync(RegisterDTO registerDto)
        {
            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                Firstname = registerDto.Firstname,
                Lastname = registerDto.Lastname,
                Address = registerDto.Address,
                PostalCode = registerDto.PostalCode,
                City = registerDto.City,
                Country = registerDto.Country,
                Phone = registerDto.Phone,
                BirthDate = registerDto.BirthDate,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return null;
            }

            // Assign default role to the user, admin role is assigned manually in Azure
            var roleExists = await _roleManager.RoleExistsAsync("customer");
            if (!roleExists)
            {
                await SeedRolesAsync();
            }

            await _userManager.AddToRoleAsync(user, "customer");

            return GenerateJwtToken(user);
        }

        public async Task<string> LoginAsync(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.Username);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                return null;
            }

            await _signInManager.PasswordSignInAsync(user, loginDTO.Password, false, false);

            return GenerateJwtToken(user);
        }

        public async Task SeedRolesAsync()
        {
            var roleNames = new[] { "customer", "admin" };

            foreach (var roleName in roleNames)
            {
                var roleExist = await _roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await _roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }

        public async Task<AccountDTO> ViewAccountAsync(ClaimsPrincipal userPrincipal)
        {
            var user = await _userManager.GetUserAsync(userPrincipal);

            if (user == null)
            {
                return null;
            }

            return new AccountDTO
            {
                Username = user.UserName,
                Email = user.Email,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Address = user.Address,
                PostalCode = user.PostalCode,
                City = user.City,
                Country = user.Country,
                Phone = user.Phone,
                BirthDate = user.BirthDate
            };
        }

        private string GenerateJwtToken(User user)
        {
            var issuer = Environment.GetEnvironmentVariable("AZURE_AUTHORITY");
            var audience = Environment.GetEnvironmentVariable("AZURE_AUDIENCE");
            var secretKey = Environment.GetEnvironmentVariable("AZURE_CLIENT_SECRET");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var userRoles = _userManager.GetRolesAsync(user).Result;
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
