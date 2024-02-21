using kz.Models;

namespace kz.Controllers.other.HttpClasses
{
    public class AdminDataResponseObj
    {
        public List<AdminDataResponseTable> Users { get; set; } = new List<AdminDataResponseTable>();
    }
    public class AdminDataResponseTable
    {
        public string Name { get; set; } = "";
        public string TabelCode { get; set; } = "";
        public string NumberBans { get; set; } = "";
    }

    public class AdminGetUserInfoResponseObj
    {
        public string? Name { get; set; }
        public string? TabelCode { get; set; }
        public string? NumberBans { get; set; }
        public string? LastLoginDate { get; set; }
        public List<BanUser> Bans { get; set; }
    }
    public class BanUser
    {
        public string? IP { get; set; }
        public string? Date { get; set; }
    }

    public class DataResponse
    {
        public string TabelCode { get; set; } = "";
        public int Role { get; set; }
        public string Name { get; set; } = "";
        public List<Article> Articles { get; set; } = new List<Article>();
        public double BeforeDolg { get; set; }
        public double AfterDolg { get; set; }
        public double TotalDohod { get; set; }
    }

}
