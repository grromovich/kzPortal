using kz.Controllers;
using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using static kz.Controllers.LoginController;


namespace kz.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PasswordChangeController : Controller
    {
        public class PasswordChangeRequest
        {
            public string APIkey { get; set; } = "";
            public string OldPassword { get; set; } = "";
            public string NewPassword { get; set; } = "";
        }

        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            var data = await HttpContext.Request.ReadFromJsonAsync<PasswordChangeRequest>();

            Setting? setting = db.Settings.FirstOrDefault(u => u.APIkey == data.APIkey);
            User? user = db.Users.FirstOrDefault(u => u.TabelCode == setting.TabelCode);
            if (user != null)
            {
                if (user.Password == LoginController.ToSHA256(data.OldPassword))
                {
                    if(data.NewPassword.Length > 5)
                    {
                        user.Password = LoginController.ToSHA256(data.NewPassword);
                        db.Users.Update(user);
                        db.SaveChanges();
                        await Response.WriteAsJsonAsync(true);
                    }
                    else
                    {
                        await Response.WriteAsJsonAsync(new { Error = "Ошибка смены пароля" });
                    }
                }
                else
                {
                    await Response.WriteAsJsonAsync(new { Error = "Ошибка смены пароля" });
                }
            }
            else
            {
                await Response.WriteAsJsonAsync(new { Error = "Ошибка смены пароля" });
            }
            
        }

    }
}
