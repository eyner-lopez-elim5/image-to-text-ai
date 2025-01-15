document.addEventListener("DOMContentLoaded", function() {
    // Obtener el área de arrastre y el formulario
    var dropArea = document.getElementById('dropArea');
    var form = document.getElementById('fileForm');
    
    // Prevenir el comportamiento por defecto del formulario al hacer submit
    form.addEventListener('submit', function(event) {
      event.preventDefault();  // Prevenir recarga del formulario
      console.log('Formulario interceptado. No recargará la página.');
    });
    
    // Prevenir comportamiento por defecto al arrastrar el archivo
    dropArea.addEventListener('dragover', function(event) {
      event.preventDefault();  // Evitar abrir el archivo en el navegador
      dropArea.style.backgroundColor = '#f0f0f0'; // Cambio de color al arrastrar
    });
    
    // Al soltar el archivo, limpiamos el color de fondo
    dropArea.addEventListener('dragleave', function(event) {
      dropArea.style.backgroundColor = ''; // Restaurar color original
    });
    
    // Manejar el evento de soltar un archivo
    dropArea.addEventListener('drop', function(event) {
      event.preventDefault(); // Evitar comportamiento por defecto del navegador
      dropArea.style.backgroundColor = ''; // Restaurar color original
    
      // Obtener el archivo soltado
      var file = event.dataTransfer.files[0];
      if (file) {
        // Crear FormData y agregar el archivo
        var formData = new FormData();
        formData.append('image', file);
    
        // Enviar el archivo con fetch
        fetch('https://imagetotext.elim5.com/api/extract-text', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del backend:');
            // Aquí puedes manejar la respuesta y mostrar la tabla
            const tableData = data; // Esto es la tabla como cadena de texto
            const textOverlay = $('#text-overlay');
            textOverlay.empty();
            const table = $('<table>').addClass('extracted-table');
    
            const rows = tableData.split('\n');
            rows.forEach(row => {
                const tr = $('<tr>');
                const columns = row.split('|');
                columns.forEach(column => {
                    const td = $('<td>').text(column.trim());
                    tr.append(td);
                });
                table.append(tr);
            });
    
            textOverlay.append(table);
        })
        .catch(error => {
          console.error('Error al subir el archivo', error);
        });
      }
    });
    });
      