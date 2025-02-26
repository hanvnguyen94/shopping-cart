// graphql/schema.js

import { Product } from "../src/models/Product.js";


export const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    quantity: Int!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    productByName(name: String!): [Product!]!
    productsByPrice(minPrice: Float!, maxPrice: Float!): [Product!]!
  }

  type Mutation {
    addProduct(name: String!, description: String, price: Float!, quantity: Int!): Product
    updateProduct(id: ID!, name: String, description: String, price: Float, quantity: Int): Product
    deleteProduct(id: ID!): Product
  }
`;

export const resolvers = {
  Query: {
    products: async () => {
      try {
        const products = await Product.find();
        console.log("Fetched Products:", products); // 👈 Kiểm tra dữ liệu có từ DB không
        return products;
        // return await Product.find();
      } catch (error) {
        // throw new Error(error);
        console.error("???? Heyyyy Error fetching products:", error);
        throw new Error(error);
      }
    },
    product: async (_, { id }) => {
      try {
        return await Product.findById(id);
      } catch (error) {
        throw new Error(error);
      }
    },
    productByName: async (_, { name }) => {
      try {
        return await Product.find({ name: { $regex: name, $options: "i" } });
      } catch (error) {
        throw new Error(error);
      }
    },
    productsByPrice: async (_, { minPrice, maxPrice }) => {
      try {
        return await Product.find({
          price: { $gte: minPrice, $lte: maxPrice },
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addProduct: async (_, { name, description, price, quantity }) => {
      try {
        const newProduct = new Product({ name, description, price, quantity });
        return await newProduct.save();
      } catch (error) {
        throw new Error(error);
      }
    },
    updateProduct: async (_, { id, name, description, price, quantity }) => {
      try {
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) updateData.price = price;
        if (quantity !== undefined) updateData.quantity = quantity;
        return await Product.findByIdAndUpdate(id, updateData, { new: true });
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        return await Product.findByIdAndRemove(id);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
