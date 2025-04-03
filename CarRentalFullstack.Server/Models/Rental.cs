using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using CarRentalFullstack.Server.Models;
using Microsoft.AspNetCore.Identity;

namespace CarRentalFullstack.Models
{
    public class Rental
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        [JsonIgnore]
        public DateTime RentalStartDate { get; set; }
        [Required]
        [JsonIgnore]
        public DateTime RentalEndDate { get; set; }
        [Required]
        public decimal Price { get; set; }
        [ForeignKey("Car")]
        public string FK_CarId { get; set; }
        public Car Car { get; set; }

        [ForeignKey("User")]
        public string FK_UserId { get; set; }  
        public User User { get; set; }
        public string RentalStart => RentalStartDate.ToString("yyyy-MM-dd: HH:mm");
        public string RentalEnd => RentalEndDate.ToString("yyyy-MM-dd: HH:mm");
    }
}
