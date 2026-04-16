using Microsoft.AspNetCore.Mvc;
namespace SkoteMvc.Controllers;

[Route("blog")]
public class BlogController : BaseController
{
    [HttpGet("list")]    public IActionResult List()    { ViewData["Title"]="Blog List";    ViewData["Breadcrumb"]=new[]{"Blog","List"};    return View(); }
    [HttpGet("grid")]    public IActionResult Grid()    { ViewData["Title"]="Blog Grid";    ViewData["Breadcrumb"]=new[]{"Blog","Grid"};    return View(); }
    [HttpGet("details")] public IActionResult Details() { ViewData["Title"]="Blog Details"; ViewData["Breadcrumb"]=new[]{"Blog","Details"}; return View(); }
}
