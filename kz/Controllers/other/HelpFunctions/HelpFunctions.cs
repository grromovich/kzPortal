using kz.Models;
using System.Diagnostics;
using System.Net;
using System.Text;
using System.Security.Cryptography;

namespace kz.Controllers.other.HelpFunctions
{
    public class HelpFunctions
    {
        public static string ToSHA256(string s)
        {
            string key = "banana"; // Не менять. Пароли не будут подходить
            using var sha256 = SHA256.Create();
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(s + key));
            var sb = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                sb.Append(bytes[i].ToString("x2"));
            }
            return sb.ToString();
        }

        public static int GetNumberBadLogins(List<BadLogin> listBadLogins, DateTime LastLoginDate = default(DateTime))
        {
            int number = 0;

            int n = 3;

            if (listBadLogins.Count < 3)
            {
                n = listBadLogins.Count;
            }

            for (int i = listBadLogins.Count - 1; i > listBadLogins.Count - n - 1; i--)
            {
                var minutes = (DateTime.Now - listBadLogins[i].BadLoginDate).Duration();
                if (minutes.Minutes < 7)
                {
                    Debug.WriteLine(LastLoginDate > default(DateTime));
                    Debug.WriteLine((LastLoginDate - listBadLogins[i].BadLoginDate).Duration().Minutes);
                    if (LastLoginDate > default(DateTime) && LastLoginDate > listBadLogins[i].BadLoginDate)
                    {
                        break;
                    }
                    number++;
                }
                else
                {
                    break;
                }
            }

            return number;
        }

        // Функция для конвертации ipv4 в ipv6
        public static string GetIPaddress(IPAddress addr)
        {
            string result = "";
            if (addr != null)
            {
                // Сравниваем адреса систем
                // Получение адреса ломается, когда сервер и браузер запущен на одной и то же машине
                if (addr.AddressFamily == System.Net.Sockets.AddressFamily.InterNetworkV6)
                {
                    addr = System.Net.Dns.GetHostEntry(addr).AddressList
            .First(x => x.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork);
                }
                result = addr.ToString();

                return result;
            }

            return addr.ToString();
        }
    }
}
