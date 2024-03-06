export async function obtenerPrecioDolarTarjeta() {
    return fetch("https://dolarapi.com/v1/dolares/oficial")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            const valorVenta = data.venta;
            return valorVenta;
        })
        .catch(error => {
            throw error;
        });
}
