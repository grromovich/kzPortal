using kz.Models;
using Microsoft.AspNetCore.Mvc;
using kz.Controllers.other.HttpClasses;
using kz.Controllers.other.HelpFunctions;


namespace kz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordChangeController : Controller
    {
        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            var data = await ReadJsonClass.ReadJson(Request.Body, new PasswordChangeRequest());

            Setting? setting = db.Settings.FirstOrDefault(u => u.APIkey == data.APIkey);
            User? user = db.Users.FirstOrDefault(u => u.TabelCode == setting.TabelCode);

            if (user != null)
            {
                if (user.Password == HelpFunctions.ToSHA256(data.OldPassword))
                {
                    if(data.NewPassword.Length > 5)
                    {
                        user.Password = HelpFunctions.ToSHA256(data.NewPassword);
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
