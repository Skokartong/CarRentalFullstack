using CarRentalFullstack.Models;
using CarRentalFullstack.Models.Enums;
using CarRentalFullstack.Server.Data.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace CarRentalFullstack.Server.Data.Repositories
{
    public class RentalRepository : IRentalRepository
    {
        private readonly CarRentalContext _context;
        private readonly ILogger<IRentalRepository> _logger;

        public RentalRepository(CarRentalContext context, ILogger<IRentalRepository> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task AddRentalAsync(Rental rental)
        {
            _logger.LogInformation("Adding rental with ID: {Id} to the repository.", rental.Id);

            await _context.Rentals.AddAsync(rental);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRentalAsync(string rentalId)
        {
            _logger.LogInformation("Deleting rental with ID: {Id} in the repository.", rentalId);

            var rental = await GetRentalByIdAsync(rentalId);

            _context.Rentals.Remove(rental);
            _context.SaveChanges();
        }

        public async Task UpdateRentalAsync(Rental rental)
        {
            _logger.LogInformation("Updating rental with ID: {Id} in the repository.", rental.Id);

            _context.Rentals.Update(rental);
            await _context.SaveChangesAsync();
        }

        public async Task<Rental?> GetRentalByIdAsync(string rentalId)
        {
            _logger.LogInformation("Fetching rental with ID: {Id} in the repository.", rentalId);

            return await _context.Rentals.FirstOrDefaultAsync(r => r.Id == rentalId);
        }

        public async Task<List<Rental>> GetRentalsByCarIdAsync(string carId)
        {
            _logger.LogInformation("Fetching rentals from car with ID: {Id} in the repository.", carId);

            return await _context.Rentals
                .Where(r => r.FK_CarId == carId)
                .ToListAsync();
        }

        public async Task<List<Rental>> GetRentalsByCountryAsync(CountryCode country)
        {
            _logger.LogInformation("Fetching rentals from country with code: {Country} in the repository.", country);

            return await _context.Rentals
                .Include(r => r.Car)
                .Where(r => r.Car.Country == country)
                .ToListAsync();
        }

        public async Task<List<Rental>> GetRentalsByCustomerIdAsync(string userId)
        {
            _logger.LogInformation("Fetching rentals from customer with ID: {Id} in the repository.", userId);
            
            return await _context.Rentals
                .Where(r => r.FK_UserId == userId)
                .Include(r => r.Car)
                .ToListAsync();
        }

        public async Task<List<Rental>> GetRentalsAsync()
        {
            _logger.LogInformation("Fetching all rentals in the repository.");

            return await _context.Rentals
                .Include (r => r.Car)
                .ToListAsync();
        }
    }
}
