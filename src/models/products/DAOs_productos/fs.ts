import moment from 'moment'
import fs from 'fs';
import {
  newProductI,
  ProductI,
  ProductBaseClass,
  ProductQuery,
} from '../products.interface';

let setTime : string = moment(new Date()).format("DD/MM/YYYY HH:MM:SS");

export class ProductosFSDAO implements ProductBaseClass {
  private productos: ProductI[] = [];
  private nombreArchivo: string;

  constructor(fileName: string) {
    const mockData = [
      {
        _id: "1",
        timestamp: "26/08/2021 12:08:22",
        nombre: "lapiz",
        description: "sirve para escribir",
        codigo: 5555,
        foto: "https://",
        precio: 200,
        stock: 3
      },
      {
        _id: "2",
        timestamp: "26/08/2021 12:08:22",
        nombre: "cartuchera",
        description: "sirve para escribir",
        codigo: 1223,
        foto: "https://",
        precio: 200,
        stock: 3
      },
      {
        _id: "3",
        timestamp: "26/08/2021 12:08:22",
        nombre: "birome",
        description: "sirve para escribir",
        codigo: 4555,
        foto: "https://",
        precio: 300,
        stock: 3
      }
    ];
    this.nombreArchivo = fileName;
    this.productos = mockData;
    this.guardar();
  }

  async leer(archivo: string): Promise<void> {
    this.productos = JSON.parse(await fs.promises.readFile(archivo, 'utf-8'));
  }

  async guardar(): Promise<void> {
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(this.productos, null, '\t')
    );
  }

  async findIndex(id: string): Promise<number> {
    await this.leer(this.nombreArchivo);
    return this.productos.findIndex((aProduct: ProductI) => aProduct._id == id);
  }

  async find(id: string): Promise<ProductI | undefined> {
    await this.leer(this.nombreArchivo);

    return this.productos.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<ProductI[]> {
    await this.leer(this.nombreArchivo);

    if (id) {
      return this.productos.filter((aProduct) => aProduct._id === id);
    }
    return this.productos;
  }

  async add(data: newProductI): Promise<ProductI> {
    if (!data.nombre || !data.precio) throw new Error('invalid data');

    await this.leer(this.nombreArchivo);

    const newItem: ProductI = {
      _id: (this.productos.length + 1).toString(),
      timestamp: setTime,
      nombre: data.nombre,
      precio: data.precio,
      description: data.description,
      codigo: data.codigo,
      foto: data.foto,
      stock: data.stock
    };

    this.productos.push(newItem);

    await this.guardar();

    return newItem;
  }

  async update(id: string, newProductData: newProductI): Promise<ProductI> {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct: ProductI = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);

    await this.guardar();

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    this.productos.splice(index, 1);
    await this.guardar();
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    await this.leer(this.nombreArchivo);
    type Conditions = (aProduct: ProductI) => boolean;
    const query: Conditions[] = [];

    if (options.nombre)
      query.push((aProduct: ProductI) => aProduct.nombre == options.nombre);

    if (options.precio)
      query.push((aProduct: ProductI) => aProduct.precio == options.precio);

    return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}
