using CarRentalFullstack.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarRentalFullstack.Server.Models.DTOs
{
    public class CreateUpdateRentalDTO
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        public DateTime RentalStart { get; set; }
        [Required]
        public DateTime RentalEnd { get; set; }
        [Required]
        [JsonIgnore]
        public decimal Price { get; set; }
        [ForeignKey("Car")]
        public string FK_CarId { get; set; }
        // When creating or updating a rental, calculation of price must be done
        public decimal CalculatePrice(Car car)
        {
            if (car == null)
            {
                throw new InvalidDataException("Car must be assigned before calculating price.");
            }

            // Check if rental end is set after rental start
            if (RentalEnd <= RentalStart)
            {
                throw new InvalidDataException("Rental end date must come after rental start.");
            }

            var rentalDuration = RentalEnd - RentalStart;

            decimal price = 0;

            // If rental period is less than one hour, round up to one hour
            if (rentalDuration.TotalHours < 1)
            {
                price = car.PricePerHour;
            }

            // If the rental period is one full day or more, calculate price based on PricePerDay
            else if (rentalDuration.TotalDays >= 1)
            {
                price = (decimal)rentalDuration.TotalDays * car.PricePerDay;
            }

            // If the rental period is less than a day, calculate price based on PricePerHour
            else
            {
                price = (decimal)rentalDuration.TotalHours * car.PricePerHour;
            }

            Price = Math.Round(price, 2);
            return Price;
        }
    }
}
