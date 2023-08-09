namespace kz.Models
{
    public class Article
    {
        public string? TabelCode { get; }
        // Типы статьи:
        //      Начислено - Na
        //      Удержано - Ud
        //      Выплачено - Vi
        public string? ArticleType { get; } 
        public string? ArticleName { get; }
        public int DayTime { get; }
        public int HourTime { get; }
        public int Money { get; }
    }
}
