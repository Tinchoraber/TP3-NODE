class DateTimeHelper {
    isDate = (fecha) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(fecha);
      };
      
    getOnlyDate = (fecha = new Date()) => {
        return fecha.toISOString().split('T')[0];
      };
    
      getEdadActual = (fechaNacimiento) => {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        const edadMilisegundos = hoy - nacimiento;
        const edad = new Date(edadMilisegundos);
        return Math.abs(edad.getUTCFullYear() - 1970);
      };
    
      getDiasHastaMiCumple = (fechaNacimiento) => {
        const hoy = new Date();
        const cumpleanios = new Date(fechaNacimiento);
        cumpleanios.setFullYear(hoy.getFullYear());
        if (cumpleanios < hoy) {
          cumpleanios.setFullYear(hoy.getFullYear() + 1);
        }
        const unDia = 1000 * 60 * 60 * 24;
        return Math.round((cumpleanios - hoy) / unDia);
      };
    
      getDiaTexto = (fecha, retornarAbreviacion = false) => {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDay();
        if (retornarAbreviacion) {
          return diasSemana[dia].substring(0, 3);
        }
        return diasSemana[dia];
      };
    
      getMesTexto = (fecha, retornarAbreviacion = false) => {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const fechaObj = new Date(fecha);
        const mes = fechaObj.getMonth();
        if (retornarAbreviacion) {
          return meses[mes].substring(0, 3);
        }
        return meses[mes];
      };
    }
    export default new DateTimeHelper();