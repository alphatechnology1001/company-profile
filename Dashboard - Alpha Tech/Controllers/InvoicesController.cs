using Microsoft.AspNetCore.Mvc;

namespace AlphaTechnology.Controllers;

public class InvoicesController : Controller
{
    public IActionResult Index()
    {
        ViewData["ActivePage"] = "invoices";
        ViewData["Breadcrumb"] = "Invoice";
        ViewData["Title"] = "Daftar Invoice";
        return View();
    }

    public IActionResult Detail()
    {
        ViewData["ActivePage"] = "invoices";
        ViewData["Breadcrumb"] = "Invoice / Detail";
        ViewData["Title"] = "Detail Invoice";
        return View();
    }
}
