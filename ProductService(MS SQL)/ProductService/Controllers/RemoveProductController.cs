using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductService.Database;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductService.Controllers
{
    [Route("product/remove")]
    [ApiController]
    public class RemoveProductController : ControllerBase
    {
        DatabaseContext db;
        public RemoveProductController()
        {
            db = new DatabaseContext();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                db.Products.Remove(db.Products.FirstOrDefault(e => e.ProductID == id));
                db.SaveChanges();
                return StatusCode(StatusCodes.Status202Accepted);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, "Product with Id = "+id.ToString()+" not found to delete");
            }
        }
    }
}
