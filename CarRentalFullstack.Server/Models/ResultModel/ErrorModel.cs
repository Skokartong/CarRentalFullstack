using System.Net;

namespace CarRentalFullstack.Models.ResultModel
{
    public record ErrorModel
    {
        public string Message { get; set; }
        public HttpStatusCode HttpStatusCode { get; set; }

        public ErrorModel(string message, HttpStatusCode httpStatusCode)
        {
            Message = message;
            HttpStatusCode = httpStatusCode;
        }
    }
}

