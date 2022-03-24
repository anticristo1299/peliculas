using back_end.validaciones;
using System.ComponentModel.DataAnnotations;

namespace back_end.Entidades
{
    public class Genero
    {
        public int Id { get; set; }
        //[Required(ErrorMessage ="El campo Nombre es requerido")]
        [Required]
        [StringLength(maximumLength:50)]
        [FirstLetterUpperCase]
        public string Nombre { get; set; }
        
    }
}
