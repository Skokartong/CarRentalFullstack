using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarRentalFullstack.Server.Models;
using CarRentalFullstack.Server.Models.DTOs;
using CarRentalFullstack.Server.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace CarRentalFullstack.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
 

        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
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

        public async Task<string> LoginAsync(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                return null;
            }

            await _signInManager.PasswordSignInAsync(user, password, false, false);

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
