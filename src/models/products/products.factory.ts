import { ProductosMemDAO } from './DAOs_productos/memory';
import { ProductosFSDAO } from './DAOs_productos/fs';
import { ProductosAtlasDAO } from './DAOs_productos/mongo';
import { ProductosMySQL } from './DAOs_productos/mysql'
import { Logger } from '../../services/logger';

import path from 'path';

export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
  Firebase = 'FIREBASE',
}

export class NoticiasFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        Logger.info('Retornando Instancia Cart fs');
        const filePath = path.resolve(__dirname, './DAOs/products.json');
        Logger.info(filePath);
        return new ProductosFSDAO(filePath);

      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Cart Mongo Atlas');
        return new ProductosAtlasDAO();

      case TipoPersistencia.LocalMongo:
        Logger.info('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new ProductosAtlasDAO(true);
       
      case TipoPersistencia.Memoria:
        Logger.info('RETORNANDO INSTANCIA MEMORIA');
        return new ProductosMemDAO();

      case TipoPersistencia.SQLITE3:
        Logger.info('RETORNANDO SQLITE3');
        return new ProductosMySQL(true);
      
      case TipoPersistencia.MYSQL:
        Logger.info('RETORNANDO INSTANCIA MYSQL');
        return new ProductosMySQL(); 

      default:
        Logger.info('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProductosMemDAO();
    }
  }
}
