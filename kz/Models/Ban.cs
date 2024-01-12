using System.ComponentModel.DataAnnotations.Schema;

namespace kz.Models
{
    public class Ban
    {
        public string TabelCode { get; set; }
        public DateTime BanDate { get; set; }
        public string IPaddress { get; set; }
    }
}
