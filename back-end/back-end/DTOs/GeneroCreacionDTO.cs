using back_end.validaciones;
using System.ComponentModel.DataAnnotations;

namespace back_end.DTOs
{
    public class GeneroCreacionDTO
    {
        [Required]
        [StringLength(maximumLength: 50)]
        [FirstLetterUpperCase]
        public string Nombre { get; set; }
    }
}
