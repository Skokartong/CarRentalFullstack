using CarRentalFullstack.Models;
using CarRentalFullstack.Models.Enums;
using CarRentalFullstack.Server.Data.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;
using ILogger = Serilog.ILogger;

namespace CarRentalFullstack.Server.Data.Repositories
{
    public class CarRepository : ICarRepository
    {
        private readonly CarRentalContext _context;
        private readonly ILogger<ICarRepository> _logger;

        public CarRepository(CarRentalContext dictionary, ILogger<ICarRepository> logger)
        {
            _context = dictionary;
            _logger = logger;
        }

        public async Task AddCarAsync(Car car)
        {
            _logger.LogInformation("Adding car with ID: {Id} to the repository.", car.Id);

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCarAsync(Car car)
        {
            _logger.LogInformation("Updating car with ID: {Id} in the repository.", car.Id);

            _context.Cars.Update(car);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCarAsync(string carId)
        {
            _logger.LogInformation("Deleting car with ID: {Id} in the repository.", carId);

            var car = await GetCarByIdAsync(carId);

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
        }

        public async Task<Car?> GetCarByIdAsync(string carId)
        {
            _logger.LogInformation("Fetching car with ID: {Id} from the repository.", carId);

            return await _context.Cars.FirstOrDefaultAsync(c => c.Id == carId);
        }

        public async Task<List<Car>> GetCarsAsync()
        {
            _logger.LogInformation("Fetching all cars from repository.");

            return await _context.Cars.ToListAsync();
        }

        public async Task<List<Car>> GetCarsByCountryAsync(CountryCode country)
        {
            _logger.LogInformation("Fetching all cars with country code: {Country} from repository.", country);

            return await _context.Cars
                .Where(c => c.Country == country)
                .ToListAsync();
        }
    }
}
