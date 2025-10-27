import { Client, TablesDB, Storage, Query, ID, Databases } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, userId, status }) {
    try {
      return await this.databases.createRow({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
        data: {
          title,
          slug,
          content,
          featuredImage,
          userId,
          status,
        },
      });
    } catch (error) {
      console.log("appwrite create post error", error);
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateRow({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.log("appwrite update post error", error);
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.log("appwrite delete post error", error);
      return false;
    }
  }
  async getPosts() {
    try {
      return await this.databases.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.log("appwrite get posts error", error);
      throw error;
    }
  }
  async getPosts(queries = [Query.equal("status", "published")]) {
    try {
      return await this.databases.listRows({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        queries: queries,
      });
    } catch (error) {}
  }
  //File Upload Methods
  async uploadFile(file) {
    try {
      await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
      return true;
    } catch (error) {
      console.log("appwrite upload file error", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.log("appwrite delete file error", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.storage.getFilePreview({
      bucketId: conf.appwriteBucketId,
      fileId: fileId,
    });
  }
}
const service = new Service();
export default service;
