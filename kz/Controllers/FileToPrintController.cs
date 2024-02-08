using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace kz.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class FileToPrintController : Controller
    {
        private class JsonObj
        {
            public string? APIkey { get; set; }
        }

        [HttpPost]
        public async Task Post(ApplicationContext db)
        {
            JsonObj data;
            using (var reader = new StreamReader(Request.Body))
            {
                var body = await reader.ReadToEndAsync();
                data = JsonSerializer.Deserialize<JsonObj>(body);
            }


            Setting? user = await db.Settings.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);

            if (user != null)
            {
                Response.ContentType = "application/pdf";
                await Response.SendFileAsync("./files/test.pdf");
            }
            else
            {
                await Response.WriteAsync("Ошибка с аккаунтом админа");
            }
        }
    }
}