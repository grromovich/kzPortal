using System.ComponentModel.DataAnnotations;

namespace kz.Models
{
    public class User
    {
        public string TabelCode { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        public string PhoneCode { get; set; }

        public string LogInToken { get; set; }
    }
}
