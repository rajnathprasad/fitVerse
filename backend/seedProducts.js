// ============================================
// ONE-TIME PRODUCT SEED SCRIPT
// Place this file in your backend/ folder
// Run with: node seedProducts.js
// ============================================

import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

dotenv.config();

// ---- Cloudinary config ----
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ---- Mongoose model ----
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

// ---- All products data (copied from assets.js) ----
// Since images are local files in frontend, we'll upload placeholder
// images from a public CDN or you can replace imageUrl with real paths.
// 
// OPTION A (default): Uses a placeholder image for all products.
// OPTION B: If you have the actual image files, put the path to your
//           frontend/src/assets folder in ASSETS_PATH below.

const ASSETS_PATH = "../frontend/src/assets"; // relative to backend/

const products = [
  { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 100, images: ["p_img1.png"], category: "Women", subCategory: "Topwear", sizes: ["S", "M", "L"], date: 1716634345448, bestseller: true },
  { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 200, images: ["p_img2_1.png", "p_img2_2.png", "p_img2_3.png", "p_img2_4.png"], category: "Men", subCategory: "Topwear", sizes: ["M", "L", "XL"], date: 1716621345448, bestseller: true },
  { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 220, images: ["p_img3.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "L", "XL"], date: 1716234545448, bestseller: true },
  { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 110, images: ["p_img4.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "XXL"], date: 1716621345448, bestseller: true },
  { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 130, images: ["p_img5.png"], category: "Women", subCategory: "Topwear", sizes: ["M", "L", "XL"], date: 1716622345448, bestseller: true },
  { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 140, images: ["p_img6.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "L", "XL"], date: 1716623423448, bestseller: true },
  { name: "Men Tapered Fit Flat-Front Trousers", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 190, images: ["p_img7.png"], category: "Men", subCategory: "Bottomwear", sizes: ["S", "L", "XL"], date: 1716621542448, bestseller: false },
  { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 140, images: ["p_img8.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716622345448, bestseller: false },
  { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 100, images: ["p_img9.png"], category: "Kids", subCategory: "Topwear", sizes: ["M", "L", "XL"], date: 1716621235448, bestseller: false },
  { name: "Men Tapered Fit Flat-Front Trousers", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 110, images: ["p_img10.png"], category: "Men", subCategory: "Bottomwear", sizes: ["S", "L", "XL"], date: 1716622235448, bestseller: false },
  { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 120, images: ["p_img11.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L"], date: 1716623345448, bestseller: false },
  { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 150, images: ["p_img12.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716624445448, bestseller: false },
  { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 130, images: ["p_img13.png"], category: "Women", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716625545448, bestseller: false },
  { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 160, images: ["p_img14.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716626645448, bestseller: false },
  { name: "Men Tapered Fit Flat-Front Trousers", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 140, images: ["p_img15.png"], category: "Men", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], date: 1716627745448, bestseller: false },
  { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 170, images: ["p_img16.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716628845448, bestseller: false },
  { name: "Men Tapered Fit Flat-Front Trousers", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 150, images: ["p_img17.png"], category: "Men", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], date: 1716629945448, bestseller: false },
  { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 180, images: ["p_img18.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716631045448, bestseller: false },
  { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 160, images: ["p_img19.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716632145448, bestseller: false },
  { name: "Women Palazzo Pants with Waist Belt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 190, images: ["p_img20.png"], category: "Women", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], date: 1716633245448, bestseller: false },
  { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 170, images: ["p_img21.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716634345448, bestseller: false },
  { name: "Women Palazzo Pants with Waist Belt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 200, images: ["p_img22.png"], category: "Women", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], date: 1716635445448, bestseller: false },
  { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 180, images: ["p_img23.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716636545448, bestseller: false },
  { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 210, images: ["p_img24.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716637645448, bestseller: false },
  { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 190, images: ["p_img25.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716638745448, bestseller: false },
  { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 220, images: ["p_img26.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716639845448, bestseller: false },
  { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 200, images: ["p_img27.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716640945448, bestseller: false },
  { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 230, images: ["p_img28.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716642045448, bestseller: false },
  { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 210, images: ["p_img29.png"], category: "Women", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716643145448, bestseller: false },
  { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 240, images: ["p_img30.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716644245448, bestseller: false },
  { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 220, images: ["p_img31.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716645345448, bestseller: false },
  { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 250, images: ["p_img32.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716646445448, bestseller: false },
  { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 230, images: ["p_img33.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716647545448, bestseller: false },
  { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 260, images: ["p_img34.png"], category: "Women", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716648645448, bestseller: false },
  { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 240, images: ["p_img35.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716649745448, bestseller: false },
  { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 270, images: ["p_img36.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716650845448, bestseller: false },
  { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 250, images: ["p_img37.png"], category: "Women", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716651945448, bestseller: false },
  { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 280, images: ["p_img38.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716653045448, bestseller: false },
  { name: "Men Printed Plain Cotton Shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 260, images: ["p_img39.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716654145448, bestseller: false },
  { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 290, images: ["p_img40.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716655245448, bestseller: false },
  { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 270, images: ["p_img41.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716656345448, bestseller: false },
  { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 300, images: ["p_img42.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], date: 1716657445448, bestseller: false },
  { name: "Kid Tapered Slim Fit Trouser", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 280, images: ["p_img43.png"], category: "Kids", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], date: 1716658545448, bestseller: false },
  { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 310, images: ["p_img44.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716659645448, bestseller: false },
  { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 290, images: ["p_img45.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716660745448, bestseller: false },
  { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 320, images: ["p_img46.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716661845448, bestseller: false },
  { name: "Kid Tapered Slim Fit Trouser", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 300, images: ["p_img47.png"], category: "Kids", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], date: 1716662945448, bestseller: false },
  { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 330, images: ["p_img48.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716664045448, bestseller: false },
  { name: "Kid Tapered Slim Fit Trouser", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 310, images: ["p_img49.png"], category: "Kids", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], date: 1716665145448, bestseller: false },
  { name: "Kid Tapered Slim Fit Trouser", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 340, images: ["p_img50.png"], category: "Kids", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], date: 1716666245448, bestseller: false },
  { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 320, images: ["p_img51.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716667345448, bestseller: false },
  { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.", price: 350, images: ["p_img52.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], date: 1716668445448, bestseller: false },
];

// ---- Upload image to Cloudinary from local file ----
const uploadImage = async (filename) => {
  const filePath = path.resolve(ASSETS_PATH, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  File not found: ${filePath}, skipping...`);
    return null;
  }
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
  });
  return result.secure_url;
};

// ---- Main seed function ----
const seed = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    console.log("Starting product upload...\n");

    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      console.log(`[${i + 1}/${products.length}] Uploading: ${p.name}`);

      // Upload all images for this product
      const imageUrls = [];
      for (const imgFile of p.images) {
        const url = await uploadImage(imgFile);
        if (url) imageUrls.push(url);
      }

      if (imageUrls.length === 0) {
        console.warn(`  ⚠️  No images uploaded for ${p.name}, skipping product.\n`);
        continue;
      }

      const product = new productModel({
        name: p.name,
        description: p.description,
        price: p.price,
        image: imageUrls,
        category: p.category,
        subCategory: p.subCategory,
        sizes: p.sizes,
        bestseller: p.bestseller,
        date: p.date,
      });

      await product.save();
      console.log(`  ✅ Saved: ${p.name}\n`);
    }

    console.log("🎉 All products uploaded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seed();