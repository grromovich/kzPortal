using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace kz.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonCodeController : Controller
    {
        [HttpPost]
        public bool Post(string TabelCode, ApplicationContext db)
        {
            if (db.Users.FirstOrDefault(u => u.TabelCode == TabelCode) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
