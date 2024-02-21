using kz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using kz.Controllers.other.HttpClasses;
using kz.Controllers.other.HelpFunctions;

namespace kz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileToPrintController : Controller
    {
        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            var data = await ReadJsonClass.ReadJson(Request.Body, new FileToPrintRequest());

            Setting? user = await db.Settings.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);
            
            if (user != null)
            {
                String filePath = "./files/test.pdf";
                var bytes = await System.IO.File.ReadAllBytesAsync(filePath); // Перервод pdf файла в байты, затем
                String file = Convert.ToBase64String(bytes);                  // конвертирую в base64, чтобы передать по сети
                await Response.WriteAsJsonAsync(new { file = file });
            }
            else
            {
                await Response.WriteAsync("Ошибка с аккаунтом админа");
            }
        }
    }
}