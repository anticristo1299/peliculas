namespace back_end.Utilidades
{
    public class PaginacionDTO
    {
        public int Pagina { get; set; } = 1;

        private int recordsPorPagina { get; set; } = 10;

        private readonly int cantidadMaximaPorPagina = 50;

        public int RecordsPorPagina
        {
            get
            {
                return recordsPorPagina;

            }
            set
            {
                //si el usuario me envia un valor mayor a 50 entonces se va a mostrar 50 registros,
                //si es menor a 50 ej. 30 se va mostrar solo 30 registros
                recordsPorPagina = (value > cantidadMaximaPorPagina) ? cantidadMaximaPorPagina : value;
            }
        }

    }
}
