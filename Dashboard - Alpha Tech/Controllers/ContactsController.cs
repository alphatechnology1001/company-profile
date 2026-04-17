using Microsoft.AspNetCore.Mvc;

namespace AlphaTechnology.Controllers;

public class ContactsController : Controller
{
    public IActionResult Index()
    {
        ViewData["ActivePage"] = "contacts";
        ViewData["Breadcrumb"] = "Kontak Klien";
        ViewData["Title"] = "Daftar Kontak";
        return View();
    }
}
