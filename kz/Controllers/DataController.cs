using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace kz.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : Controller
    {
        [HttpPost]
        public List<kz.Models.Article> GetData(string TabelCode, ApplicationContext db)
        {
            return db.Articles.Where(u => u.TabelCode == TabelCode).ToList();
        }
    }
}
