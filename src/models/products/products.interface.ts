export interface newProductI {
  codigo: number;
  description: string;
  nombre?: string;
  precio?: number;
  timestamp?: string;
  foto: string;
  stock: number; 
}

export interface ProductI {
  _id: string;
  timestamp: string;
  nombre: string;
  description: string;
  codigo: number;
  foto: string;
  precio: number;
  stock: number;
}

export interface mockDataI {
  nombre: string;
  description: string;
  codigo: number;
  foto: string;
  precio: number;
  stock: number;
}

export interface ProductQuery {
  nombre?: string;
  precio?: number;
}

export interface KnexI {
  [key: string]: {
    client: string;
    connection: {
      host?: string;
      user?: string;
      password?: string;
      database?: string;
      filename?: string;
    };
    migrations?: {
      directory: string;
    };
    seeds?: {
      directory: string;
    };
    pool?: {
      min?: number;
      max?: number;
    };
    useNullAsDefault?: boolean;
  };
}

export interface ProductBaseClass {
  get(id?: string | undefined): Promise<ProductI[]>;
  add(data: newProductI): Promise<ProductI>;
  update(id: string, newProductData: newProductI): Promise<ProductI>;
  delete(id: string): Promise<void>;
  query(options: ProductQuery): Promise<ProductI[]>;
}
