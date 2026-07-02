function BreadcrumbProductos({ search, categoria, orden }) {
  const items = [];

  if (search.trim()) {
    items.push(`Buscar: ${search}`);
  }

  if (categoria !== "todos") {
    items.push(
      `Categoría: ${
        categoria.charAt(0).toUpperCase() + categoria.slice(1)
      }`
    );
  }

  if (orden) {
    const textos = {
      "precio-asc": "Precio: Menor a mayor",
      "precio-desc": "Precio: Mayor a menor",
      "nombre-asc": "Nombre: A-Z",
      "nombre-desc": "Nombre: Z-A",
    };

    items.push(textos[orden]);
  }

  // Si no hay filtros, no mostrar nada
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="breadcrumb-productos">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && (
            <span className="breadcrumb-separator"> / </span>
          )}
          <span className="breadcrumb-item">{item}</span>
        </span>
      ))}
    </div>
  );
}

export default BreadcrumbProductos;