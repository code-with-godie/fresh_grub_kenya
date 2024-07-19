export const appwriteConfig = {
  appWriteEndPoint: String(process.env.REACT_APP_APPWRITE_END_POINT),
  appWriteProject: String(process.env.REACT_APP_APPWRITE_PROJECT),
  appWriteBucket: String(process.env.REACT_APP_APPWRITE_BUCKET),
  appWriteDatabase: String(process.env.REACT_APP_APPWRITE_DATABASE),
  appWriteProductCollectionID: String(
    process.env.REACT_APP_APPWRITE_PRODUCT_COLLECTION_ID
  ),
  appWriteUsersCollectionID: String(
    process.env.REACT_APP_APPWRITE_USERS_COLLECTION_ID
  ),
  appWriteRestaurantsCollectionID: String(
    process.env.REACT_APP_APPWRITE_RESTAURANTS_COLLECTION_ID
  ),
  appWriteOrdersCollectionID: String(
    process.env.REACT_APP_APPWRITE_ORDERS_COLLECTION_ID
  ),
};
