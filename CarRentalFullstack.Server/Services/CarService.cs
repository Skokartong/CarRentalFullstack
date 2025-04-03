using CarRentalFullstack.Server.Data;
using CarRentalFullstack.Models;
using CarRentalFullstack.Models.Enums;
using CarRentalFullstack.Models.ResultModel;
using CarRentalFullstack.Services.IServices;
using ILogger = Serilog.ILogger;
using System.Net;
using CarRentalFullstack.Server.Data.Repositories.IRepositories;

namespace CarRentalFullstack.Services
{
    public class CarService : ICarService
    {

        private readonly ICarRepository _carRepository;
        private readonly IRentalRepository _rentalRepository;
        private readonly ILogger<CarService> _logger;

        public CarService(ICarRepository carRepository, IRentalRepository rentalRepository, ILogger<CarService> logger)
        {
            _carRepository = carRepository;
            _rentalRepository = rentalRepository;
            _logger = logger;
        }

        private async Task<ResultModel<Car>> ValidateCar(Car car, string methodName)
        {
            foreach (var property in typeof(Car).GetProperties())
            {
                var value = property.GetValue(car);

                if (value is string str && string.IsNullOrWhiteSpace(str))
                {
                    _logger.LogWarning("{Method}: {Property} is missing or empty with CarID: {Id}", methodName, property.Name, car.Id);
                    return ResultModel<Car>.Failure(new ErrorModel($"{property.Name} is missing or empty", HttpStatusCode.BadRequest));
                }

                else if ((value is int intValue && intValue <= 0) || (value is decimal decimalValue && decimalValue <= 0))
                {
                    _logger.LogWarning("{Method}: {Property} can't be zero or negative. Value: {Value}", methodName, property.Name, value);
                    return ResultModel<Car>.Failure(new ErrorModel($"{property.Name} can't be zero or negative", HttpStatusCode.BadRequest));
                }

                else if (property.PropertyType == typeof(int) && !int.TryParse(value.ToString(), out _))
                {
                    _logger.LogWarning("{Method}: {Property} is invalid (non-numeric value) with CarID: {Id}", methodName, property.Name, car.Id);
                    return ResultModel<Car>.Failure(new ErrorModel($"{property.Name} is invalid (non-numeric value)", HttpStatusCode.BadRequest));
                }

                else if (property.PropertyType == typeof(decimal) && !decimal.TryParse(value.ToString(), out _))
                {
                    _logger.LogWarning("{Method}: {Property} is invalid (non-numeric value) with CarID: {Id}", methodName, property.Name, car.Id);
                    return ResultModel<Car>.Failure(new ErrorModel($"{property.Name} is invalid (non-numeric value)", HttpStatusCode.BadRequest));
                }

                else if (value is Enum @enum)
                {
                    if (!Enum.IsDefined(property.PropertyType, @enum))
                    {
                        _logger.LogWarning("{Method}: {Property} is invalid enum value with CarID: {Id}", methodName, property.Name, car.Id);
                        return ResultModel<Car>.Failure(new ErrorModel($"{property.Name} has an invalid enum value", HttpStatusCode.BadRequest));

                    }
                }
            }

            return ResultModel<Car>.Success(car);
        }

        public async Task<ResultModel<Car>> AddCarAsync(Car car)
        {
            // Set default values when adding car
            car.IsBooked = false;

            var validationResult = await ValidateCar(car, nameof(AddCarAsync));

            if (validationResult.HasError)
            {
                _logger.LogError("{Method}: Could not add car with ID: {Id}", nameof(AddCarAsync), car.Id);
                return validationResult;
            }

            await _carRepository.AddCarAsync(car);

            _logger.LogInformation("{Method}: Successfully added car with ID: {Id}", nameof(AddCarAsync), car.Id);
            return ResultModel<Car>.Success(car);
        }

        public async Task<ResultModel<Car>> UpdateCarAsync(Car car)
        {
            var carResult = await GetCarByIdAsync(car.Id);

            if (carResult.HasError)
            {
                return carResult;
            }

            var validationResult = await ValidateCar(car, nameof(UpdateCarAsync));

            if (validationResult.HasError)
            {
                _logger.LogError("{Method}: Could not update car with ID: {Id}", nameof(UpdateCarAsync), car.Id);
                return validationResult;
            }

            var updatedCar = carResult.Value;

            updatedCar.Id = car.Id;
            updatedCar.IsBooked = false;
            updatedCar.Brand = car.Brand;
            updatedCar.Model = car.Model;
            updatedCar.Colour = car.Colour;
            updatedCar.Year = car.Year;
            updatedCar.PricePerDay = car.PricePerDay;
            updatedCar.Country = car.Country;

            await _carRepository.UpdateCarAsync(updatedCar);

            _logger.LogInformation("{Method}: Successfully updated car with ID: {Id}", nameof(UpdateCarAsync), car.Id);
            return ResultModel<Car>.Success(updatedCar);
        }

        public async Task<ResultModel<Car>> GetCarByIdAsync(string carId)
        {
            var car = await _carRepository.GetCarByIdAsync(carId);

            if (car == null)
            {
                _logger.LogWarning("{Method}: Car with ID: {Id} not found", nameof(GetCarByIdAsync), carId);

                var error = new ErrorModel("Car not found.", HttpStatusCode.NotFound);
                return ResultModel<Car>.Failure(error);
            }

            _logger.LogInformation("{Method}: Successfully fetched car with ID: {Id}", nameof(GetCarByIdAsync), carId);
            return ResultModel<Car>.Success(car);
        }

        public async Task<ResultModel<List<Car>>> GetCarsAsync()
        {
            var cars = await _carRepository.GetCarsAsync();

            if (cars == null)
            {
                _logger.LogWarning("{Method}: No cars available", nameof(GetCarsAsync));

                var error = new ErrorModel("No cars found.", HttpStatusCode.NotFound);
                return ResultModel<List<Car>>.Failure(error);
            }

            _logger.LogInformation("{Method}: Successfuly fetched all cars.", nameof(GetCarsAsync));
            return ResultModel<List<Car>>.Success(cars);
        }

        public async Task<ResultModel<List<Car>>> GetCarsByCountryCodeAsync(CountryCode country)
        {
            var cars = await _carRepository.GetCarsByCountryAsync(country);

            if (cars == null)
            {
                _logger.LogWarning("{Method}: No cars found for country: {CountryCode}", nameof(GetCarsByCountryCodeAsync), country);

                var error = new ErrorModel("No cars found for the specified country.", HttpStatusCode.NotFound);
                return ResultModel<List<Car>>.Failure(error);
            }

            _logger.LogInformation("{Method}: Successfully fetched cars in country with ID: {CountryCode}", nameof(GetCarsByCountryCodeAsync), country);
            return ResultModel<List<Car>>.Success(cars);
        }

        public async Task<ResultModel<Car>> DeleteCarAsync(string carId)
        {
            if (await _carRepository.GetCarByIdAsync(carId) == null)
            {
                _logger.LogWarning("{Method}: Car with ID: {Id} not found", nameof(DeleteCarAsync), carId);

                var error = new ErrorModel("Car not found.", HttpStatusCode.NotFound);
                return ResultModel<Car>.Failure(error);
            }

            // Check if car has any active rentals
            var rentals = await _rentalRepository.GetRentalsByCarIdAsync(carId);

            if (rentals.Any(r => r.RentalEndDate >= DateTime.Now))
            {
                _logger.LogWarning("{Method}: Cannot delete car with ID: {CarId}. Active rentals exist.", nameof(DeleteCarAsync), carId);

                var error = new ErrorModel("Selected car has active rentals attached to it. Delete rentals first.", HttpStatusCode.Conflict);
                return ResultModel<Car>.Failure(error);
            }

            await _carRepository.DeleteCarAsync(carId);

            _logger.LogInformation("{Method}: Successfully deleted car with ID: {CarId}.", nameof(DeleteCarAsync), carId);
            return ResultModel<Car>.Success(null);
        }
    }
}
