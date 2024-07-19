import { Client, Databases, Query } from 'appwrite';
import { appwriteConfig } from './appConfig';

class AppWriteService {
  #_client = new Client();
  #_database;
  constructor() {
    this.#_client
      .setEndpoint(appwriteConfig.appWriteEndPoint)
      .setProject(appwriteConfig.appWriteProject);
    this.#_database = new Databases(this.#_client);
  }
  async getTopRestaurant() {
    try {
      const restaurants = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRestaurantsCollectionID,
        [Query.limit(10)]
      );
      return restaurants.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllMenus() {
    try {
      const restaurants = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRestaurantsCollectionID,
        [Query.limit(10)]
      );
      const products = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteProductCollectionID,
        [Query.limit(30)]
      );
      return [restaurants.documents, products.documents];
    } catch (error) {
      throw new Error(error);
    }
  }
  async getRestaurant(id) {
    try {
      return await this.#_database.getDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRestaurantsCollectionID,
        id
      );
    } catch (error) {
      throw new Error(error);
    }
  }
  async getSingleProduct(id) {
    try {
      return await this.#_database.getDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteProductCollectionID,
        id
      );
    } catch (error) {
      throw new Error(error);
    }
  }
  // async getTopRestaurant(){
  //   try {

  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }
}

export const appwriteService = new AppWriteService();
