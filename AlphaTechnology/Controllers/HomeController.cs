using Microsoft.AspNetCore.Mvc;

namespace AlphaTechnology.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
