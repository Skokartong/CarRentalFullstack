using CarRentalFullstack.Models;
using CarRentalFullstack.Models.Enums;

namespace CarRentalFullstack.Server.Data.Repositories.IRepositories
{
    public interface ICarRepository
    {
        Task AddCarAsync(Car car);
        Task UpdateCarAsync(Car car);
        Task DeleteCarAsync(string carId);
        Task<Car?> GetCarByIdAsync(string carId);
        Task<List<Car>> GetCarsByCountryAsync(CountryCode country);
        Task<List<Car>> GetCarsAsync();
    }
}

