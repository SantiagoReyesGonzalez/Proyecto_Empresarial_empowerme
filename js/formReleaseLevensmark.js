const supabaseUrl = 'https://qynkxggihazsmpvvjzvb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5bmt4Z2dpaGF6c21wdnZqenZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDgzNjAsImV4cCI6MjA2NjI4NDM2MH0.Feq88N8U91xG8jdTeQdR9rmnaxkm83XOeieLumTi7Ms'; // Usa aquí tu anon key completa
const client = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value.trim(),
      correo: form.correo.value.trim(),
      ciudadResidencia: form.ciudad.value.trim(),
      edad: parseInt(form.edad.value, 10) || null,
      telefono: form.telefono.value.trim(),
      comoSeEntero: form.como.value,
      interes: form.interes.value.trim(),
      conociaAntes: form.previo.value,
      actualizacionLibro: form.libro.value === 'si',
      deseaActualizaciones: form.actualizaciones.checked,
      autorizaImagen: form.imagen.checked,
      aceptaPolitica: form.privacidad.checked
    };

    if (!data.aceptaPolitica) {
      alert('Debes aceptar la política de privacidad.');
      return;
    }

    const { error } = await client
      .from('registroLanzamientoLevensmark')
      .insert([data]);

    if (error) {
      console.error(error);
      alert('❌ Error al registrar: ' + error.message);
    } else {
      alert('✅ ¡Registro exitoso!');
      form.reset();
    }
  });
});
