using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;
using System;
using System.Collections.Generic;

namespace kz.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AdminDataController : Controller
    {
        private class JsonObj
        {
            public string? APIkey { get; set; }
            public string? Search { get; set; }

        }

        public class UserTable
        {
            public string? Name { get; set; }
            public string? TabelCode { get; set; }
            public string? NumberBans {  get; set; }
        }
        public class ResponseJsonObj
        {
            public List<UserTable>? Users { get; set; }
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

            Admin? admin = await db.Admins.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);

            if (admin != null)
            {
                
            }
        }
    }
}
