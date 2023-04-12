// Clase
class ProductManager {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = null;
  }
}

const products = [];
function getProducts() {
  console.log("Productos:", products);
}

function addProduct(title, description, price, thumbnail, code, stock) {
  if (!title || !description || !price || !thumbnail || !code || !stock) {
    console.error("Los campos son obligatorios");
    return;
  }

  const existingProduct = products.find((product) => product.code === code);
  if (existingProduct) {
    console.error("Código existente");
    return;
  }

  const product = new ProductManager(
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  );
  product.id = products.length + 1;
  products.push(product);
  console.log(product);
}

function getProductById(id) {
  const product = products.find((product) => product.id === id);
  if (!product) {
    throw new Error("No se encuentra producto");
  }
  console.log(product);
}

// Testing
getProducts(); //Llamo al arreglo que se encuentra vacío.
addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
); //Se agrega producto.
getProducts(); //Vuelvo a llamar arreglo, con producto agregado.
addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
); //Repito produtco pero da error.
getProductById(1); //Se realiza busqueda de ID y se encuentra.
try {
  getProductById(2); //Busco producto inexistente y tira un error.
} catch (error) {
  console.error(error.message);
}
