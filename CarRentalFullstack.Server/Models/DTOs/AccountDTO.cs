﻿namespace CarRentalFullstack.Server.Models.DTOs
{
    public class AccountDTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
