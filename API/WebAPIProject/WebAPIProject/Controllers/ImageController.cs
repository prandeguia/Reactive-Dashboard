using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIProject.Model;

namespace WebAPIProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly APIDBContext _context;

        private IHostingEnvironment Environment;

        public ImageController(APIDBContext context, IHostingEnvironment _environment)
        {
            Environment = _environment ?? throw new ArgumentNullException(nameof(_environment));
            _context = context;
        }

        // GET: api/Image
        [HttpGet]
        public System.Object GetImages()
        {
            string myHostUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}" + "/Image/";

            var results = _context
                  .Images
                  .ToList()
                  .Select(f => new
                  {

                      img = myHostUrl + f.ImageName
                  });
            return results;
        }

        // POST: api/Image
        [HttpPost]
        public async Task PostImage(IFormFile formFile)
        {
            if (ModelState.IsValid)
            {
                var files = HttpContext.Request.Form.Files;
                foreach (var Image in files)
                {
                    if (Image != null && Image.Length > 0)
                    {
                        var file = Image;
                        //There is an error here
                        var uploads = Path.Combine(Environment.WebRootPath, "Image");
                        if (file.Length > 0)
                        {
                            var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
                            using (var fileStream = new FileStream(Path.Combine(uploads, fileName), FileMode.Create))
                            {
                                await file.CopyToAsync(fileStream);
                                Image images = new Image()
                                {
                                    ImageCaption = "Upload",
                                    ImageName = fileName
                                };
                                _context.Add(images);
                                await _context.SaveChangesAsync();
                            }

                        }
                    }
                }
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors);
            }
            //return CreatedAtAction("GetImage", new { id = image.ImageID }, image);
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            //string path = Path.Combine(this.Environment.WebRootPath, "Uploads");
            //if (!Directory.Exists(path))
            //{
            //    Directory.CreateDirectory(path);
            //}
            ////Save to DB
            //Image images = new Image()
            //{
            //    ImageCaption = image.ImageCaption,
            //    ImageName = image.ImageName
            //};

            //_context.Images.Add(image);
            //await _context.SaveChangesAsync();

            //return CreatedAtAction("GetImage", new { id = image.ImageID }, image);
        }

        // GET: api/Image/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            var path = Path.Combine(Environment.WebRootPath, "image", $"{image.ImageName}");
            var imageFileStream = System.IO.File.OpenRead(path);
            return File(imageFileStream, "image/jpeg");
        }

        //// GET api/<controller>/5
        //[HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{
        //    //var path = Environment.WebRootFileProvider.GetFileInfo("image/")?.PhysicalPath;

        //    var results = _context.Images.Where(u => u.ImageID == id).SingleOrDefault().ImageName;

        //    //for (int i = 0; i < Convert.ToInt32(results.FirstOrDefault()); i++)
        //    //{
        //    //    imageName = results;
        //    //}
        //    if (results!=null)
        //    {
        //        var path = Path.Combine(Environment.WebRootPath, "image", $"{results}");
        //        var imageFileStream = System.IO.File.OpenRead(path);
        //        return File(imageFileStream, "image/jpeg");
        //    }
        //    else
        //    {
        //        return Ok();
        //    }


        //}


        private bool ImageExists(int id)
        {
            return _context.Images.Any(e => e.ImageID == id);
        }
    }
}