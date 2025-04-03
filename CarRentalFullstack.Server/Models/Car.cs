using CarRentalFullstack.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarRentalFullstack.Models
{
    public class Car
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Colour { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public decimal PricePerDay { get; set; }
        [Required]
        public decimal PricePerHour { get; set; }
        [Required]
        public CountryCode Country { get; set; }
        [Required]
        [JsonIgnore]
        public bool IsBooked { get; set; }
        // Each car can have multiple bookings attached to it (one to many relationship)
        [JsonIgnore]
        public ICollection<Rental> Rentals { get; set; } = new List<Rental>();
    }
}
