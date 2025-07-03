import React, { useEffect, useState } from 'react';

function Peliculas() {
    const [peliculas, setPeliculas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost/mi_api/get_peliculas.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPeliculas(data.data);
                } else {
                    setError(data.message);
                }
            })
            .catch(err => {
                setError("Error al conectar con el servidor");
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h2>Listado de Películas</h2>
                {error && <p>{error}</p>}
                {peliculas.length === 0 && !error && (
                    <p>No hay películas registradas.</p>
                )}
                <ul>
                    {peliculas.map((peli, index) => (
                        <li key={index}>
                            <strong>{peli.pelicula}</strong> ({peli.director})<br />
                            Actores: {peli.actores}<br />
                            Presupuesto: {peli.presupuesto}<br />
                            Casa Productora: {peli.casa_productora}<br />
                            Director más famoso por: {peli.pelicula_mas_famosa}<br />
                            Patrimonio del director: {peli.patrimonio}<br /><br />
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
}
export default Peliculas;