import { obtenerPrecioDolarTarjeta } from './api.js';

document.getElementById('calcularImpuestos').addEventListener('click', async function () {
    const valorEnDolares = parseFloat(document.getElementById('valorCompra').value.trim());
    const precioDolarOficial = await obtenerPrecioDolarTarjeta();
    const valorPesosSinImpuestos = valorEnDolares * precioDolarOficial;
    const valorIngresado = valorEnDolares * precioDolarOficial;

    const resultadoImpuestoPaisElemento = document.getElementById('resultadoImpuestoPais');
    const resultadoImpuestoGananciasElemento = document.getElementById('resultadoImpuestoGanancias');
    const totalElemento = document.getElementById('total');

    if (isNaN(valorIngresado) || valorIngresado <= 0) {
        alert("Por favor, ingrese un valor válido mayor que cero.");
    } else {
        try {
            const impuestoPais = (valorIngresado * 30) / 100;
            const impuestoGanancias = (valorIngresado * 30) / 100;
            const total = valorPesosSinImpuestos + impuestoPais + impuestoGanancias;

            const impuestoPaisFormateado = impuestoPais.toFixed(2);
            const impuestoGananciasFormateado = impuestoGanancias.toFixed(2);
            const totalFormateado = total.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS'
            });

            resultadoImpuestoPaisElemento.innerText = `$${impuestoPaisFormateado}`;
            resultadoImpuestoGananciasElemento.innerText = `$${impuestoGananciasFormateado}`;
            totalElemento.innerText = totalFormateado;

            document.getElementById('resultadosContainer').style.display = 'block';
            document.getElementById('resultadoTotal').style.display = 'block';

            if (window.innerWidth <= 768) {
                const invitarBoton = document.getElementById('invitarBoton');
                const computedStyles = getComputedStyle(invitarBoton);
                const marginBottom = parseInt(computedStyles.marginBottom);
                const newMarginBottom = marginBottom + 20;
                invitarBoton.style.marginBottom = `${newMarginBottom}px`;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});
