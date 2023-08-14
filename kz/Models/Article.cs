using System.ComponentModel.DataAnnotations;

namespace kz.Models
{
    public class Article
    {
        public string TabelCode { get; set; }
                              // Типы статьи:
                              //      Начислено - Na
                              //      Удержано - Ud
                              //      Выплачено - Vi
        public string ArticleType { get; set; } 
        public string ArticleName { get; set; }
        public int? DayTime { get; set; }
        public int? HourTime { get; set; }
        public double Money { get; set; }
    }
}
