import { Client, handle_file } from "@gradio/client";
import userModel from "../models/userModel.js";
import tryonModel from "../models/tryonModel.js";
const tryOn = async (req, res) => {
  try {
    const { userId, productImage } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData.image) {
      return res.json({
        success: false,
        message: "Please upload a photo on your profile first",
      });
    }
    const userImage = userData.image;

    const tokens = [
      process.env.HF_TOKEN,
      process.env.HF_TOKEN2,
      process.env.HF_TOKEN3,
    ].filter(Boolean);

    let result = null;
    for (const token of tokens) {
      try {
        const client = await Client.connect(process.env.HF_SPACE, {
          headers: { Authorization: `Bearer ${token}` },
        });
        result = await client.predict("/tryon", {
          dict: {
            background: handle_file(userImage),
            layers: [],
            composite: null,
          },
          garm_img: handle_file(productImage),
          garment_des: "garment",
          is_checked: true,
          is_checked_crop: false,
          denoise_steps: 30,
          seed: 42,
        });
        break;
      } catch (err) {
        console.log(`Token ${token.slice(0, 10)}... failed:`, err.message);
        continue;
      }
    }

    if (!result) {
      return res.json({
        success: false,
        message: "All tokens exhausted, try again later",
      });
    }

    const newTryon = new tryonModel({
      userId,
      name: userData.name,
      email: userData.email,
      userImage,
      productImage,
      resultImage: result.data[0].url,
    });
    await newTryon.save();
    res.json({ success: true, resultImage: result.data[0].url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default tryOn;
