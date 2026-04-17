using Microsoft.AspNetCore.Mvc;

namespace AlphaTechnology.Controllers;

public class CalendarController : Controller
{
    public IActionResult Index()
    {
        ViewData["ActivePage"] = "calendar";
        ViewData["Breadcrumb"] = "Kalender";
        ViewData["Title"] = "Kalender";
        return View();
    }
}
