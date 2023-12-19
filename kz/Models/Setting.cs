using System.ComponentModel.DataAnnotations;

namespace kz.Models
{
    public class Setting
    {
        public string TabelCode { get; set; }
        public string APIkey { get; set; }
        public DateTime APIkeyDate {  get; set; }
        public DateTime LastLoginDate { get; set;}
    }
}
