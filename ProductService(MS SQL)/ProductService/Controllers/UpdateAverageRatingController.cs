using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductService.Database;
using ProductService.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.Controllers
{
    [Route("product/updateRating")]
    [ApiController]
    public class UpdateAverageRatingController : Controller
    {
        DatabaseContext db;
        public UpdateAverageRatingController()
        {
            db = new DatabaseContext();
        }

        [HttpPost]
        public IActionResult UpdateAverageRating([FromBody] Product model)
        {
            try
            {
                Product myProduct = db.Products.Find(model.ProductID);
                myProduct.AverageRating = model.AverageRating;
                myProduct.NumberOfRaters = model.NumberOfRaters;
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
