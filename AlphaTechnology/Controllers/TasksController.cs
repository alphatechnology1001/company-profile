using Microsoft.AspNetCore.Mvc;

namespace AlphaTechnology.Controllers;

public class TasksController : Controller
{
    public IActionResult Kanban()
    {
        ViewData["ActivePage"] = "tasks";
        ViewData["Breadcrumb"] = "Tasks / Kanban";
        ViewData["Title"] = "Kanban Board";
        return View();
    }
}
