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
    public class AdminSearchController : Controller
    {
        private class JsonObj
        {
            public string? APIkey { get; set; }
            public string? Search { get; set; }
            public string? Type { get; set; }

        }

        public class UserTable
        {
            public string? TabelCode { get; set; }
            public string? IPaddress {  get; set; }
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
            var users = new List<UserTable>();
            Admin? admin = await db.Admins.FirstOrDefaultAsync(a => a.APIkey == data.APIkey);

            

            if (admin != null)
            {
                var logins = db.BadLogins.Select(u => new { u.TabelCode }).ToList();

                System.Diagnostics.Debug.WriteLine(logins[0]);
                /*var users = db.Users.AsNoTracking().Select(u => new { u.TabelCode, u.Name }).ToList();
                var dataUsers = new List<UserTable>();
                foreach (var user in users)
                {
                    dataUsers.Add(new UserTable {  Name = user.Name, TabelCode = user.TabelCode, NumberBans = null });
                    string JsonArticles = JsonSerializer.Serialize(NumberBansUsers, typeof(BadLogin));
                }*/

                await Response.WriteAsync("");
            }
        }
    }
}
