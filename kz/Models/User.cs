using System.ComponentModel.DataAnnotations;

namespace kz.Models
{
    public class User
    {
        public string TabelCode { get; set; }
        public string Name { get; set; }
        
        public string Password { get; set; }
        public double BeforeDolg { get; set; }
        public double AfterDolg { get; set; }
        public double TotalDohod { get; set; }
        public int Role { get; set; }
    }
}
