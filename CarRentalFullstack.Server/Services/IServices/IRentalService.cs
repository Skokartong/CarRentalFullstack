
using CarRentalFullstack.Models;
using CarRentalFullstack.Models.Enums;
using CarRentalFullstack.Models.ResultModel;
using CarRentalFullstack.Server.Models.DTOs;
using System.Runtime.Serialization;

namespace CarRentalFullstack.Services.IServices
{
    public interface IRentalService
    {
        Task<bool> IsCarAvailableAsync(string carId, DateTime rentalStart, DateTime rentalEnd, string rentalId = null);
        Task<ResultModel<CreateUpdateRentalDTO>> AddRentalAsync(CreateUpdateRentalDTO rental);
        Task<ResultModel<CreateUpdateRentalDTO>> UpdateRentalAsync(string rentalId, CreateUpdateRentalDTO rental);
        Task<ResultModel<Rental>> DeleteRentalAsync(string rentalId);
        Task<ResultModel<Rental>> GetRentalByIdAsync(string rentalId);
        Task<ResultModel<List<Rental>>> GetRentalsByCountryAsync(CountryCode country);
        Task<ResultModel<List<Rental>>> GetRentalsByCarIdAsync(string carId);
        Task<ResultModel<List<Rental>>> GetRentalsByCustomerIdAsync(string userId);
        Task<ResultModel<List<Rental>>> GetRentalsAsync();
    }
}
