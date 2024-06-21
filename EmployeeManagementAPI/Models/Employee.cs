namespace EmployeeManagementAPI.Models
{
    public class Employee
    {
        public Employee()
        {
            Salaries = new List<Salary>(); // Initialize the collection
        }

        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Department { get; set; }

        // Navigation property
        public ICollection<Salary> Salaries { get; set; }
    }
}
