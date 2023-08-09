using kz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace kz.Controllers
{
    public class PhoneCodeController : Controller
    {
        private bool _createPhoneCode(string TabelCode)
        {
            return _sendPhoneCodeToDb(_generatePhoneCode(), TabelCode); ;
        }
        private bool _sendPhoneCodeToDb(string PhoneCode, string TabelCode)
        {
            return true;
        }
        private string _generatePhoneCode()
        {
            return "000000";
        }


        private string _getPhoneCodeFromDb(string TabelCode)
        {
            if (TabelCode == "000000") {
                return "000000";
            }
            else
            {
                return "0";
            }
        }




        [HttpPost]
        public bool CreatePhoneCode(string TabelCode)
        {
            return _createPhoneCode(TabelCode);
        }

        [HttpPost]
        public bool ValidatePhoneCode(string TabelCode, string PhoneCode)
        {
            string code = _getPhoneCodeFromDb(TabelCode);
            return PhoneCode == code;
        }
    }
}
