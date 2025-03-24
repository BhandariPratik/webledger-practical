const axios = require("axios");
require("dotenv").config();
const SavedReceipt = require("../model/receipt.model");

const getReceiptList = async (filter) => {
  try {
    const options = {
      method: "GET",
      params: {
        query: filter.query,
        offset: filter.offset || 0,
        number: filter.number || 10,
        apiKey: process.env.SPOONACULAR_APIKEY,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${process.env.SPOONACULAR_BASEURL}recipes/complexSearch`,
      options
    );

    return { res: data, message: "Sucess" };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { res: [], message: "Error fetching recipes", error };
  }
};

const saveReceipt = async (receiptId) => {
  try {
    // Check if receipt is already saved
    const existing = await SavedReceipt.findOne({
      where: { user_id: userId, receipt_id: receiptId },
    });

    if (existing) {
      return res.status(400).json({ message: "Receipt already saved." });
    }

    // Save receipt
    const savedReceipt = await SavedReceipt.create({
      user_id: userId,
      receipt_id: receiptId,
    });

    return savedReceipt;
  } catch (error) {
    console.error("Error Save Receipt :", error);
    return { res: [], message: "Error Save Receipt", error };
  }
};

const unsavedReceipt = async (receiptId) => {
  try {
    // Remove the receipt
    const deleted = await SavedReceipt.destroy({
      where: { user_id: userId, receipt_id: receiptId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Receipt not found." });
    }

    return;
  } catch (error) {
    console.error("Error Save Receipt :", error);
    return { res: [], message: "Error Save Receipt", error };
  }
};

module.exports = { getReceiptList, saveReceipt, unsavedReceipt };
