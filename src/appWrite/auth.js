import { Client, Account, ID, Databases, Query, Avatars } from 'appwrite';
import { appwriteConfig } from './appConfig';
class AuthService {
  #_client = new Client();
  #_account;
  #_database;
  #_avatars;
  constructor() {
    this.#_client
      .setEndpoint(appwriteConfig.appWriteEndPoint)
      .setProject(appwriteConfig.appWriteProject);
    this.#_account = new Account(this.#_client);
    this.#_database = new Databases(this.#_client);
    this.#_avatars = new Avatars(this.#_client);
  }
  async loginWithCredentials({ email, password }) {
    try {
      let user = await this.getUser();
      console.log('auth', user);
      if (user?.email) {
        console.log('already logged in');
        return await this.getUserByEmailAddress(user?.email);
      }
      console.log('not logged in loggin in');
      user = await this.getUserByEmailAddress(email);
      if (!user) throw new Error('invalid email');
      const session = await this.#_account.createEmailPasswordSession(
        email,
        password
      );
      if (!session) throw new Error('incorrect password');
      return await this.getUserByEmailAddress(email);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUserByEmailAddress(email) {
    try {
      let user = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        [Query.equal('email', email), Query.limit(1)]
      );
      return user.documents[0];
    } catch (error) {
      throw new Error(error);
    }
  }
  async addToFavourite(email, id) {
    try {
      let user = await this.getUserByEmailAddress(email);
      let favourites = user?.favourites;
      if (favourites.includes(id)) {
        favourites = favourites.filter(item => item !== id);
        console.log('removing from favourite');
      } else {
        console.log('adding to favourite');
        favourites = [...favourites, id];
      }
      return await this.#_database.updateDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        user.$id,
        { favourites }
      );
    } catch (error) {
      throw new Error(error);
    }
  }
  async loginWithOAuthProvider(provider) {
    try {
      const account = this.#_account.createOAuth2Session(provider);
      console.log(account);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async loginWithPhone(userID, phone) {
    try {
      const account = await this.#_account.createPhoneSession(userID, phone);
      console.log(account);
    } catch (error) {
      throw new Error(error);
    }
  }
  async logout() {
    try {
      await this.#_account.deleteSessions();
      console.log('logged out');
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUser() {
    try {
      return await this.#_account.get();
    } catch (error) {
      // throw new Error(error);
      return null;
    }
  }
  async createAccount(user) {
    try {
      const { email, password, username } = user;
      const tempUser = await this.getUserByEmailAddress(email);
      if (tempUser) throw new Error('email is already taken');
      const account = await this.#_account.create(ID.unique(), email, password);
      const avatar = this.#_avatars.getInitials(username);

      if (account) {
        await this.#_database.createDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          ID.unique(),
          { username, email, avatar }
        );
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const authService = new AuthService();
