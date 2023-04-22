const fs = require("fs");
class ProductManager {
  constructor() {
    this.path = "Products.json";
    this.products = [];
    this.id = 0;
    this.file = fs.promises.writeFile(this.path, "", "utf-8");
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Los campos son obligatorios.");
        return;
      }
      const existingProduct = this.products.find(
        (product) => product.code === code
      );
      if (existingProduct) {
        console.error(`Código ${code} ya existe `);
        return;
      }
      this.id++;

      const newProduct = {
        id: this.id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      await fs.promises.appendFile(
        this.path,
        JSON.stringify(newProduct),
        "utf-8"
      );
      console.log(
        `Producto agregado exitosamente. Producto nuevo: ${JSON.stringify(
          newProduct
        )}`
      );
    } catch (err) {
      console.error(`Error al guardar producto`, err);
    }
  }
  async getProducts() {
    try {
      let readFile = await fs.promises.readFile(this.path, "utf-8");
      let readProducts = JSON.parse(readFile);
      this.products.push(readProducts);
      console.log(`Productos: ${this.products}`);
    } catch (err) {
      console.error("Error del archivo");
    }
  }
}

//Testing
const productManager = new ProductManager("./Productos.json");
productManager.getProducts(); //Llamo al arreglo que se encuentra vacío.
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
); //Se agrega producto
