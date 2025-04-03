using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CarRentalFullstack.Models.ResultModel
{
    public record ResultModel<TValue>
    {
        public TValue? Value { get; set; }
        public ErrorModel? Error { get; set; }
        public bool HasError { get; set; }

        private ResultModel(TValue value)
        {
            Value = value;
            Error = null;
            HasError = false;
        }

        private ResultModel(ErrorModel error)
        {
            Error = error;
            HasError = true;
            Value = default;
        }

        public static ResultModel<TValue> Success(TValue value) => new ResultModel<TValue>(value);
        public static ResultModel<TValue> Failure(ErrorModel error) => new ResultModel<TValue>(error);

    }
}
