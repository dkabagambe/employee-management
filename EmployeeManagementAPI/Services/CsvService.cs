using EmployeeManagementAPI.Models;
using System.Collections.Generic;
using System.Text;

namespace EmployeeManagementAPI.Services
{
    public interface ICsvService
    {
        byte[] ExportEmployeesToCsv(IEnumerable<Employee> employees);
    }

    public class CsvService : ICsvService
    {
        public byte[] ExportEmployeesToCsv(IEnumerable<Employee> employees)
        {
            var sb = new StringBuilder();
            
            // Header row
            sb.AppendLine("Id,FirstName,LastName,Email,Phone,Department");
            
            // Data rows
            foreach (var employee in employees)
            {
                sb.AppendLine($"{employee.Id},{employee.FirstName},{employee.LastName},{employee.Email},{employee.Phone},{employee.Department}");
            }
            
            return Encoding.UTF8.GetBytes(sb.ToString());
        }
    }
}
