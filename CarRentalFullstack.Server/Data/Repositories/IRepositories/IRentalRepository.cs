using CarRentalFullstack.Models;
using CarRentalFullstack.Models.Enums;

namespace CarRentalFullstack.Server.Data.Repositories.IRepositories
{
    public interface IRentalRepository
    {
        Task AddRentalAsync(Rental rental);
        Task UpdateRentalAsync(Rental rental);
        Task DeleteRentalAsync(string rentalId);
        Task<Rental?> GetRentalByIdAsync(string rentalId);
        Task<List<Rental>> GetRentalsByCountryAsync(CountryCode country);
        Task<List<Rental>> GetRentalsByCarIdAsync(string carId);
        Task<List<Rental>> GetRentalsAsync();
    }
}
