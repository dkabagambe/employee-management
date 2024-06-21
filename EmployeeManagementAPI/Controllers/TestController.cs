using Microsoft.AspNetCore.Mvc;
namespace EmployeeManagementAPI.Controllers
{
[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "CORS is working!" });
    }
}
}
