using CarRentalFullstack.Server.Models;
using CarRentalFullstack.Server.Models.DTOs;

namespace CarRentalFullstack.Server.Services.IServices
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterDTO registerDto);
        Task<string> LoginAsync(string username, string password);
    }
}
