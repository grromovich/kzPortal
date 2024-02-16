using kz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace kz.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AdminPasswordChangeController : Controller
    {
        public class AdminPasswordChangeRequest
        {
            public string APIkey { get; set; } = "";
            public string TabelCode { get; set; } = "";
            public string Password { get; set; } = "";

        }

        [HttpPost]
        
        public async Task Post(ApplicationContext db)
        {
            var data = await HttpContext.Request.ReadFromJsonAsync<AdminPasswordChangeRequest>();

            Setting? admin = await db.Settings.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);

            if (admin != null)
            {
                User user = await db.Users.FirstOrDefaultAsync(u => u.TabelCode == data.TabelCode && u.Role == 1);
                if (user != null)
                {
                    if (data.Password.Length > 5)
                    {
                        user.Password = LoginController.ToSHA256(data.Password);
                        db.Users.Update(user);
                        db.SaveChanges();
                        await Response.WriteAsJsonAsync(true);
                    }
                    else
                    {
                        await Response.WriteAsJsonAsync(new { Error = "Ошибка смены пароля" });
                    }
                }
            }
            else
            {
                await Response.WriteAsJsonAsync(new { Error = "Ошибка смены пароля" });
            }
        }

    }
}
