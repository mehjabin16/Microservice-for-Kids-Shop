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
    [Route("product/add")]
    [ApiController]
    public class AddProductController : ControllerBase
    {
        DatabaseContext db;
        public AddProductController()
        {
            db = new DatabaseContext();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Product model)
        {
            try
            {
                if(db.Products.Any(e => e.ProductName == model.ProductName))
                {
                    return StatusCode(StatusCodes.Status400BadRequest, model);
                }
                else
                {
                    db.Products.Add(model);
                    db.SaveChanges();
                    return StatusCode(StatusCodes.Status201Created, model);
                }
               
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

    }
}
