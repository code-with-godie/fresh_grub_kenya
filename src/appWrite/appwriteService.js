import { Client, Databases, ID, Query, Storage } from 'appwrite';
import { appwriteConfig } from './appConfig';

class AppWriteService {
  #_client = new Client();
  #_database;
  #_storage;
  constructor() {
    this.#_client
      .setEndpoint(appwriteConfig.appWriteEndPoint)
      .setProject(appwriteConfig.appWriteProject);
    this.#_database = new Databases(this.#_client);
    this.#_storage = new Storage(this.#_client);
  }
  async getBestSellingDishes() {
    try {
      const restaurants = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteProductCollectionID,
        [Query.limit(10), Query.orderDesc('$createdAt')]
      );
      return restaurants.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  async search(searchTerm) {
    try {
      const data = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteProductCollectionID,
        [
          Query.or([
            Query.search('title', searchTerm),
            Query.contains('categories', searchTerm),
          ]),
        ]
      );
      return data.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  async filterProducts(filters) {
    try {
      let query = [];
      if (!filters?.includes('all')) {
        query = [
          Query.or([
            Query.contains('title', filters),
            Query.contains('categories', filters),
          ]),
        ];
      }
      const data = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteProductCollectionID,
        query
      );
      return data.documents;
    } catch (error) {
      throw new Error(error);
    }
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
      const categories = [];

      products.documents.forEach(item => {
        const cats = item.categories;
        cats.forEach(category => {
          if (!categories.includes(category)) {
            categories.push(category);
          }
        });
      });
      return {
        restaurants: restaurants.documents,
        products: products.documents,
        categories,
      };
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
  async getSingleUserRestaurants(id) {
    try {
      const res = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRestaurantsCollectionID,
        [Query.equal('owner', id), Query.select(['$id', 'name'])]
      );
      return res.documents;
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
  async createRestaurant(restaurant) {
    try {
      //upload the restaurant image
      const { image: file, short, city, country, ...data } = restaurant;
      if (!file) throw new Error('Restaurant image is required');
      var image = await this.uploadFile(file);
      if (!image) throw new Error('image not uploaded');

      //get restaurant image url
      var url = this.getFilePreview(image.$id);
      //delete the images because it may be corrupted
      if (!url) {
        await this.deleteFile(image.$id);
        throw new Error('no image url');
      }
      const tempHotel = {
        ...data,
        short_desc: short,
        longitude: city?.longitude,
        latitude: city?.latitude,
        country: country?.name,
        city: country?.name,
        image: url,
        imageRef: image.$id,
      };
      const res = await this.#_database.createDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRestaurantsCollectionID,
        ID.unique(),
        tempHotel
      );
      if (!res) {
        await this.deleteFile(image.$id);
      }
      return res;
    } catch (error) {
      if (url) {
        await this.deleteFile(image.$id);
      }
      throw new Error(error);
    }
  }
  async createDish(dish) {
    try {
      //upload the dish image
      const { image: file, ...data } = dish;
      if (!file) throw new Error('Dish image is required');
      var image = await this.uploadFile(file);
      if (!image) throw new Error('image not uploaded');

      //get dish image url
      var url = this.getFilePreview(image.$id);
      //delete the images because it may be corrupted
      if (!url) {
        await this.deleteFile(image.$id);
        throw new Error('no image url');
      }
      const tempDish = {
        ...data,
        image: url,
        imageID: image.$id,
      };
      const res = await this.#_database.createDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteProductCollectionID,
        ID.unique(),
        tempDish
      );
      if (!res) {
        await this.deleteFile(image.$id);
      }
      return res;
    } catch (error) {
      if (url) {
        await this.deleteFile(image.$id);
      }
      throw new Error(error);
    }
  }
  async uploadFile(file) {
    try {
      const uploadedFile = this.#_storage.createFile(
        appwriteConfig.appWriteBucket,
        ID.unique(),
        file
      );
      console.log('file uploaded');
      return uploadedFile;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteFile(id) {
    console.log('deleting a file');
    try {
      return await this.#_storage.deleteFile(appwriteConfig.appWriteBucket, id);
    } catch (error) {
      throw new Error(error);
    }
  }
  getFilePreview(id) {
    try {
      console.log('getting file preview');
      return this.#_storage.getFilePreview(
        appwriteConfig.appWriteBucket,
        id,
        1000,
        1000,
        'center',
        100
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const appwriteService = new AppWriteService();
