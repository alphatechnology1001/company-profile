using Microsoft.AspNetCore.Mvc;

namespace AlphaTechnology.Controllers;

public class ProjectsController : Controller
{
    public IActionResult Index()
    {
        ViewData["ActivePage"] = "projects";
        ViewData["Breadcrumb"] = "Proyek";
        ViewData["Title"] = "Daftar Proyek";
        return View();
    }

    public IActionResult Overview()
    {
        ViewData["ActivePage"] = "projects";
        ViewData["Breadcrumb"] = "Proyek / HR Management System";
        ViewData["Title"] = "Project Overview";
        return View();
    }

    public IActionResult Create()
    {
        ViewData["ActivePage"] = "projects";
        ViewData["Breadcrumb"] = "Proyek / Buat Baru";
        ViewData["Title"] = "Buat Proyek Baru";
        return View();
    }
}
