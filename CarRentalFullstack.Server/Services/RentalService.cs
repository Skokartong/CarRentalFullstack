using CarRentalFullstack.Server.Data;
using CarRentalFullstack.Models;
using CarRentalFullstack.Services.IServices;
using Microsoft.AspNetCore.Http.HttpResults;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Net;
using CarRentalFullstack.Models.ResultModel;
using Microsoft.AspNetCore.Mvc;
using CarRentalFullstack.Models.Enums;
using System.Reflection;
using CarRentalFullstack.Server.Data.Repositories.IRepositories;
using CarRentalFullstack.Server.Models.DTOs;
using Microsoft.AspNetCore.Identity;
using CarRentalFullstack.Server.Models;
using System.Security.Claims;

namespace CarRentalFullstack.Services
{
    public class RentalService : IRentalService
    {

        private readonly IRentalRepository _rentalRepository;
        private readonly ICarRepository _carRepository;
        private readonly ILogger<RentalService> _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RentalService(IRentalRepository rentalRepository, ICarRepository carRepository, ILogger<RentalService> logger, IHttpContextAccessor httpContextAccessor)
        {
            _rentalRepository = rentalRepository;
            _carRepository = carRepository;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResultModel<List<Car>>> GetAvailableCarsAsync(CountryCode country, DateTime rentalStart, DateTime rentalEnd)
        {
            var carsResult = await _carRepository.GetCarsByCountryAsync(country);

            if (carsResult == null || !carsResult.Any())
            {
                var error = new ErrorModel("No cars found in this country.", HttpStatusCode.NotFound);
                return ResultModel<List<Car>>.Failure(error);
            }

            var availableCars = new List<Car>();

            foreach (var car in carsResult)
            {
                var rentals = await _rentalRepository.GetRentalsByCarIdAsync(car.Id);

                bool isAvailable = true;
                foreach (var rental in rentals)
                {
                    if ((rentalStart < rental.RentalEndDate) && (rentalEnd > rental.RentalStartDate))
                    {
                        isAvailable = false;
                        break;
                    }
                }

                if (isAvailable)
                {
                    availableCars.Add(car);
                }
            }

            return ResultModel<List<Car>>.Success(availableCars);
        }

        public async Task<bool> IsCarAvailableAsync(string carId, DateTime rentalStartDate, DateTime rentalEndDate, string rentalId = null)
        {
            var rentals = await _rentalRepository.GetRentalsByCarIdAsync(carId);

            foreach (var rental in rentals)
            {
                // Check if the rental being updated is the same as the existing rental (by ID)
                if (rentalId != null && rental.Id == rentalId)
                {
                    continue;
                }

                if ((rentalStartDate < rental.RentalEndDate) && (rentalEndDate > rental.RentalStartDate))
                {
                    return false;
                }
            }

            return true;
        }

        public async Task<ResultModel<CreateUpdateRentalDTO>> AddRentalAsync(CreateUpdateRentalDTO rental)
        {
            var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                var error = new ErrorModel("User is not authenticated.", HttpStatusCode.Unauthorized);
                return ResultModel<CreateUpdateRentalDTO>.Failure(error);
            }

            var car = await _carRepository.GetCarByIdAsync(rental.FK_CarId);

            if (car == null)
            {
                _logger.LogInformation("{Method}: Car with ID: {Id} not found.", nameof(AddRentalAsync), rental.FK_CarId);

                var error = new ErrorModel("Car not found.", HttpStatusCode.NotFound);
                return ResultModel<CreateUpdateRentalDTO>.Failure(error);
            }

            bool isAvailable = await IsCarAvailableAsync(rental.FK_CarId, rental.RentalStart, rental.RentalEnd);

            if (!isAvailable)
            {
                _logger.LogError("{Method}: Could not add rental due to conflicts.", nameof(AddRentalAsync));

                var error = new ErrorModel("Car not available for selected period.", HttpStatusCode.Conflict);
                return ResultModel<CreateUpdateRentalDTO>.Failure(error);
            }

            car.IsBooked = true;

            // Update parameter "IsBooked" for selected period and calculate price
            await _carRepository.UpdateCarAsync(car);
            rental.Price = rental.CalculatePrice(car);

            // Create a new Rental object from CreateUpdateRentalDTO
            var rentalToAdd = new Rental
            {
                FK_CarId = rental.FK_CarId,
                RentalStartDate = rental.RentalStart,
                RentalEndDate = rental.RentalEnd,
                Price = rental.Price,
                FK_UserId = userId,
                Car = car
            };

            await _rentalRepository.AddRentalAsync(rentalToAdd);

            _logger.LogInformation("{Method}: Successfully added rental.", nameof(AddRentalAsync));
            return ResultModel<CreateUpdateRentalDTO>.Success(rental);
        }

        public async Task<ResultModel<Rental>> DeleteRentalAsync(string rentalId)
        {
            var rental = await _rentalRepository.GetRentalByIdAsync(rentalId);

            if (rental == null)
            {
                _logger.LogInformation("{Method}: Rental with ID: {Id} not found.", nameof(DeleteRentalAsync), rentalId);

                var error = new ErrorModel($"Could not find rental with id {rentalId}", HttpStatusCode.NotFound);
                return ResultModel<Rental>.Failure(error);
            }

            // Mark car as available again (IsBooked = false)
            var car = await _carRepository.GetCarByIdAsync(rental.FK_CarId);

            if (car != null)
            {
                car.IsBooked = false;
                await _carRepository.UpdateCarAsync(car);
            }

            await _rentalRepository.DeleteRentalAsync(rentalId);

            _logger.LogInformation("{Method}: Successfully deleted rental with ID: {Id}.", nameof(DeleteRentalAsync), rentalId);
            return ResultModel<Rental>.Success(rental);
        }

        public async Task<ResultModel<CreateUpdateRentalDTO>> UpdateRentalAsync(string rentalId, CreateUpdateRentalDTO CreateUpdateRentalDTO)
        {
            var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                var error = new ErrorModel("User is not authenticated.", HttpStatusCode.Unauthorized);
                return ResultModel<CreateUpdateRentalDTO>.Failure(error);
            }

            var rental = await _rentalRepository.GetRentalByIdAsync(rentalId);

            if (rental == null)
            {
                _logger.LogInformation("{Method}: Could not find any rental with ID: {Id}.", nameof(UpdateRentalAsync), rentalId);

                var error = new ErrorModel($"Could not find rental with ID: {rentalId}", HttpStatusCode.NotFound);
                return ResultModel<CreateUpdateRentalDTO>.Failure(error);
            }

            var car = await _carRepository.GetCarByIdAsync(CreateUpdateRentalDTO.FK_CarId);

            if (car == null)
            {
                _logger.LogInformation("{Method}: Could not find any car with ID: {Id}.", nameof(UpdateRentalAsync), CreateUpdateRentalDTO.FK_CarId);

                var error = new ErrorModel("Car with ID: {Id} not found.", HttpStatusCode.NotFound);
                return ResultModel<CreateUpdateRentalDTO>.Failure(error);
            }

            bool isAvailable = await IsCarAvailableAsync(CreateUpdateRentalDTO.FK_CarId, CreateUpdateRentalDTO.RentalStart, CreateUpdateRentalDTO.RentalEnd, rentalId);

            if (!isAvailable)
            {
                _logger.LogInformation("{Method}: Car with ID: {Id} not available for selected rental period.", nameof(UpdateRentalAsync), rentalId);

                var error = new ErrorModel("Car is not available for selected period.", HttpStatusCode.Conflict);
                return ResultModel<CreateUpdateRentalDTO>.Failure(error);
            }

            // Update car booking status based on the new rental period
            if (rental.RentalEndDate < DateTime.Now)
            {
                car.IsBooked = false;
            }

            // Update properties in rental model
            rental.FK_CarId = CreateUpdateRentalDTO.FK_CarId;
            rental.RentalStartDate = CreateUpdateRentalDTO.RentalStart;
            rental.RentalEndDate = CreateUpdateRentalDTO.RentalEnd;
            rental.FK_UserId = userId;

            // Recalculate price based on the new rental period
            rental.Price = CreateUpdateRentalDTO.CalculatePrice(car);
            await _rentalRepository.UpdateRentalAsync(rental);

            // Mark car as booked for new rental period
            car.IsBooked = true;
            await _carRepository.UpdateCarAsync(car);

            _logger.LogInformation("{Method}: Successfully updated rental with ID: {Id}.", nameof(UpdateRentalAsync), rental.Id);

            // Convert back the updated Rental object to CreateUpdateRentalDTO
            var updatedRental = new CreateUpdateRentalDTO
            {
                FK_CarId = rental.FK_CarId,
                RentalStart = rental.RentalStartDate,
                RentalEnd = rental.RentalEndDate,
                Price = rental.Price
            };

            return ResultModel<CreateUpdateRentalDTO>.Success(updatedRental);
        }

        public async Task<ResultModel<Rental>> GetRentalByIdAsync(string rentalId)
        {
            var rental = await _rentalRepository.GetRentalByIdAsync(rentalId);

            if (rental == null)
            {
                _logger.LogInformation("{Method}: Rental not found with ID: {Id}", nameof(GetRentalByIdAsync), rentalId);

                var error = new ErrorModel($"Rental with ID: {rentalId} not found", HttpStatusCode.NotFound);
                return ResultModel<Rental>.Failure(error);
            }

            _logger.LogInformation("{Method}: Successfully fetched rental with ID: {Id}.", nameof(GetRentalByIdAsync), rentalId);
            return ResultModel<Rental>.Success(rental);
        }

        public async Task<ResultModel<List<Rental>>> GetRentalsAsync()
        {
            var rentals = await _rentalRepository.GetRentalsAsync();

            if (rentals == null)
            {
                _logger.LogInformation("{Method}: No rentals where found.", nameof(GetRentalsAsync));

                var error = new ErrorModel("No rentals found.", HttpStatusCode.NotFound);
                return ResultModel<List<Rental>>.Failure(error);
            }

            _logger.LogInformation("{Method}: Successfully fetched all rentals.", nameof(GetRentalsAsync));
            return ResultModel<List<Rental>>.Success(rentals);
        }

        public async Task<ResultModel<List<Rental>>> GetRentalsByCountryAsync(CountryCode country)
        {
            var rentals = await _rentalRepository.GetRentalsByCountryAsync(country);

            if (rentals == null)
            {
                _logger.LogInformation("{Method}: No rentals where found in country with code: {Country}.", nameof(GetRentalsByCountryAsync), country);

                var error = new ErrorModel($"No rentals in country: {country} found.", HttpStatusCode.NotFound);
                return ResultModel<List<Rental>>.Failure(error);
            }

            _logger.LogInformation("{Method}: Successfully fetched all rentals with country code: {CountryCode}", nameof(GetRentalsByCountryAsync), country);
            return ResultModel<List<Rental>>.Success(rentals);
        }

        public async Task<ResultModel<List<Rental>>> GetRentalsByCarIdAsync(string carId)
        {
            if (await _carRepository.GetCarByIdAsync(carId) == null)
            {
                _logger.LogInformation("{Method}: No car with ID: {Id} found.", nameof(GetRentalsByCarIdAsync), carId);

                var error = new ErrorModel($"No car with ID: {carId} found.", HttpStatusCode.NotFound);
                return ResultModel<List<Rental>>.Failure(error);
            }

            var rentals = await _rentalRepository.GetRentalsByCarIdAsync(carId);

            if (rentals == null)
            {
                _logger.LogInformation("{Method}: No rentals for car with ID: {Id} exist.", nameof(GetRentalsByCarIdAsync), carId);

                var error = new ErrorModel($"No rentals found for car with ID: {carId}", HttpStatusCode.NotFound);
                return ResultModel<List<Rental>>.Failure(error);
            }

            _logger.LogInformation("{Method}: Successfully fetched all rentals from car with ID: {Id}", nameof(GetRentalsByCarIdAsync), carId);
            return ResultModel<List<Rental>>.Success(rentals);
        }

        public async Task<ResultModel<List<Rental>>> GetRentalsByCustomerIdAsync(string userId)
        {
            var rentals = await _rentalRepository.GetRentalsByCustomerIdAsync(userId);
            
            if (rentals == null)
            {
                _logger.LogInformation("{Method}: No rentals for customer with ID: {Id} exist.", nameof(GetRentalsByCustomerIdAsync), userId);
                
                var error = new ErrorModel($"No rentals found for customer with ID: {userId}", HttpStatusCode.NotFound);
                return ResultModel<List<Rental>>.Failure(error);
            }

            _logger.LogInformation("{Method}: Successfully fetched all rentals from customer with ID: {Id}", nameof(GetRentalsByCustomerIdAsync), userId);
            return ResultModel<List<Rental>>.Success(rentals);
        }
    }
}
