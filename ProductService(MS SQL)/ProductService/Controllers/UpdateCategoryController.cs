using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductService.Database;
using ProductService.Database.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductService.Controllers
{
    [Route("product/updateCategory")]
    [ApiController]
    public class UpdateCategoryController : ControllerBase
    {
        DatabaseContext db;
        public UpdateCategoryController()
        {
            db = new DatabaseContext();
        }

        [HttpGet("{id}")]
        public Product Get(int id)
        {
            return db.Products.Find(id);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Product model)
        {
            try
            {
                Product myProduct = db.Products.Find(model.ProductID);
                Category myCategory = db.Categories.Find(model.CategoryId);
                myProduct.CategoryId = model.CategoryId;
                myProduct.CategoryName = myCategory.Name;
                db.SaveChanges();
                return StatusCode(StatusCodes.Status202Accepted);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex);
            }
        }

    }
}
