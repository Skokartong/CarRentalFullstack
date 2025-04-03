using CarRentalFullstack.Models;
using CarRentalFullstack.Models.Enums;
using CarRentalFullstack.Models.ResultModel;

namespace CarRentalFullstack.Services.IServices
{
    public interface ICarService
    {
        Task<ResultModel<Car>> AddCarAsync(Car car);
        Task<ResultModel<Car>> UpdateCarAsync(Car car);
        Task<ResultModel<Car>> DeleteCarAsync(string carId);
        Task<ResultModel<Car>> GetCarByIdAsync(string carId);
        Task<ResultModel<List<Car>>> GetCarsByCountryCodeAsync(CountryCode country);
        Task<ResultModel<List<Car>>> GetCarsAsync();
    }
}

