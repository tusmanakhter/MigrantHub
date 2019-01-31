using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Service_Recommender.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        // GET api/recommendation/{id}
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {


            return id.ToString();
        }
    }
}
