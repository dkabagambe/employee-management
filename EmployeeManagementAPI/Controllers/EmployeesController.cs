using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;
using EmployeeManagementAPI.Services;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace EmployeeManagementAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ICsvService _csvService;
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(ApplicationDbContext context, ICsvService csvService, ILogger<EmployeesController> logger)
        {
            _context = context;
            _csvService = csvService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            try
            {
                return await _context.Employees.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting employees");
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);

                if (employee == null)
                {
                    return NotFound(new { message = "Employee not found" });
                }

                return employee;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting employee");
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            try
            {
                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating employee");
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest(new { message = "Employee ID mismatch" });
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound(new { message = "Employee not found" });
                }
                else
                {
                    _logger.LogError(ex, "Concurrency error occurred while updating employee");
                    throw;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating employee");
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);
                if (employee == null)
                {
                    return NotFound(new { message = "Employee not found" });
                }

                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting employee");
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }
        }

        [HttpGet("export")]
        public async Task<IActionResult> ExportEmployeesToCsv()
        {
            try
            {
                var employees = await _context.Employees.ToListAsync();
                var csvBytes = _csvService.ExportEmployeesToCsv(employees);
                return File(csvBytes, "text/csv", "employees.csv");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while exporting employees to CSV");
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
