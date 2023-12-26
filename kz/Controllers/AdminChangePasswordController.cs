using kz.Controllers;
using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;


namespace kz.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AdminPasswordChangeController : Controller
    {
        public class JsonData
        {
            public string? APIkey { get; set; }
            public string? TabelCode { get; set; }
            public string? Password { get; set; }

        }

        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            // получаем табельный код и пароль
            // возвращаем токен
            JsonData data;
            using (var reader = new StreamReader(Request.Body))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<JsonData>(body);
            }
            Admin? admin = await db.Admins.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);

            if (admin != null)
            {
                User user = await db.Users.FirstOrDefaultAsync(u => u.TabelCode == data.TabelCode);
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
                await Response.WriteAsJsonAsync(new { Error = "Ошибка смены пароля 1" });
            }
        }

    }
}
