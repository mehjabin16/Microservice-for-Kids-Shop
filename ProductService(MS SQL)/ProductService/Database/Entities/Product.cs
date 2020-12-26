using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.Database.Entities
{
    public class Product
    {
        public Guid ProductID { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public float AverageRating { get; set; }
        public int NumberOfRaters { get; set; }

    }
}
