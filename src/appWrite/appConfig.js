// export const appwriteConfig = {
//   appWriteEndPoint: 'https://cloud.appwrite.io/v1',
//   appWriteProject: '669a5a760033e35329fa',
//   appWriteBucket: '669a60b9001816be49b7',
//   appWriteDatabase: '669a6057000eadcf7fc5',
//   appWriteProductCollectionID: '669a609200069db86161',
//   appWriteUsersCollectionID: '669a60870021a0cf9ad9',
//   appWriteRestaurantsCollectionID: '669a60ae0033cdd77315',
//   appWriteOrdersCollectionID: '669a6172002f38edf562',
// };
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
