using AutoMapper;
using back_end.DTOs;
using back_end.Entidades;
using back_end.Utilidades;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("api/generos")]
    //controllerBase me permite enviar respuesta 404
    [ApiController]//si la accion es invalida devuelve un mensaje de error NotFound();
    public class GenerosController:ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public GenerosController(ApplicationDbContext context, IMapper mapper)
        {
            
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        //eliminar esta linea de autenticacion
       // [Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<List<GeneroDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {
            
            var queryable = context.Generos.AsQueryable();
            await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            var generos = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            //mapeo Genero a generoCreacionDTO 
            return mapper.Map<List<GeneroDTO>>(generos);

        }
        [HttpGet("{Id:int}")]//api/generos/byId/2
        public async Task<ActionResult<GeneroDTO>> Get(int Id)
        {
            var genero = await context.Generos.FirstOrDefaultAsync(x => x.Id == Id);
            if(genero==null)
            {
                return NotFound();
            }

            return mapper.Map<GeneroDTO>(genero);

        }
        [HttpPut("{Id:int}")]
        public async Task<ActionResult> Put (int Id,[FromBody] GeneroCreacionDTO generoCreacionDTO)
        {
            //aca obtengo el registro por id
            var genero = await context.Generos.FirstOrDefaultAsync(x => x.Id == Id);
            if (genero == null)
            {
                return NotFound();
            }
            //aca hago la modificacion
            genero = mapper.Map(generoCreacionDTO,genero);

            await context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<Genero>> Post(GeneroCreacionDTO generoCreacionDTO)
        {
            //mapeo generoCreacionDTO a Genero
            var genero = mapper.Map<Genero>(generoCreacionDTO);
            context.Add(genero);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {

            var existe = await context.Generos.AnyAsync(x => x.Id == id);
            if(!existe)
            {
                return NotFound();
            }

            context.Remove(new Genero { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        
        }
    }
}
