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
    [Route("category/list")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        DatabaseContext db;
        public CategoryController()
        {
            db = new DatabaseContext();
        }

        public IEnumerable<Category> Get()
        {
            return db.Categories.ToList();
        }

        [HttpGet("{id}")]
        public Category Get(int id)
        {
            return db.Categories.Find(id);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Category model)
        {
            try
            {
                db.Categories.Add(model);
                db.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, model);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

    }
}
