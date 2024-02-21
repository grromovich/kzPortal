namespace kz.Controllers.other.HttpClasses
{
    public class AdminPasswordChangeRequest
    {
        public string APIkey { get; set; } = "";
        public string TabelCode { get; set; } = "";
        public string Password { get; set; } = "";

    }
    public class AdminDataRequest
    {
        public string APIkey { get; set; } = "";
    }
    public class AdminGetUserInfoRequest
    {
        public string APIkey { get; set; } = "";
        public string UserTabelCode { get; set; } = "";

    }
    public class DataRequest
    {
        public string APIkey { get; set; } = "";
    }
    public class FileToPrintRequest
    {
        public string APIkey { get; set; } = "";
    }
    public class LoginRequest
    {
        public string TabelCode { get; set; } = "";
        public string Password { get; set; } = "";
    }
    public class PasswordChangeRequest
    {
        public string APIkey { get; set; } = "";
        public string OldPassword { get; set; } = "";
        public string NewPassword { get; set; } = "";
    }

}
