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
    public class PasswordChangeController : Controller
    {
        public class JsonData
        {
            public string? APIkey { get; set; }
            public string? OldPassword { get; set; }
            public string? NewPassword { get; set; }
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
                await Response.WriteAsJsonAsync(new { Error = "Ошибка смены пароля 1" });
            }
        }

    }
}
