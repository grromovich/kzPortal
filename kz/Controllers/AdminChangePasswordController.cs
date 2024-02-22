using kz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using kz.Controllers.other.HttpClasses;
using kz.Controllers.other.HelpFunctions;
using System;

namespace kz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminPasswordChangeController : Controller
    {
        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            var data = await ReadJsonClass.ReadJson(Request.Body, new AdminPasswordChangeRequest());
            
            Setting? setting = await db.Settings.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);

            if (setting != null)
            {
                // Проверяем на роль пользователя
                User user = await db.Users.FirstOrDefaultAsync(u => u.TabelCode == data.TabelCode && u.Role == 1);

                if (user != null)
                {
                    if (data.Password.Length > 5)
                    {
                        user.Password = HelpFunctions.ToSHA256(data.Password);
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
