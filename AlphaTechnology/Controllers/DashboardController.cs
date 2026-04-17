using Microsoft.AspNetCore.Mvc;

namespace AlphaTechnology.Controllers;

public class DashboardController : Controller
{
    public IActionResult Index()
    {
        ViewData["ActivePage"] = "dashboard";
        ViewData["Breadcrumb"] = "Dashboard";
        ViewData["Title"] = "Dashboard";
        return View();
    }
}
