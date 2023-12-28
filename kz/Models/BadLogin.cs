using System.ComponentModel.DataAnnotations.Schema;

namespace kz.Models
{
    public class BadLogin
    {
        public string TabelCode { get; set; }
        public DateTime BadLoginDate { get; set; }
        public string IPaddress { get; set; }
    }
}
