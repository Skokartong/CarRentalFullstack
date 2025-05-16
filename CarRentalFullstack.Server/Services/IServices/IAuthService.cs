using CarRentalFullstack.Server.Models;
using CarRentalFullstack.Server.Models.DTOs;
using System.Security.Claims;

namespace CarRentalFullstack.Server.Services.IServices
{
    public interface IAuthService
    {
        Task SeedRolesAsync();
        Task<string> RegisterAsync(RegisterDTO registerDto);
        Task<string> LoginAsync(LoginDTO loginDTO);
        Task<AccountDTO> ViewAccountAsync(ClaimsPrincipal userPrincipal);
    }
}
