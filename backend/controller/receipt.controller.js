const { getUserIdFromToken } = require("../middleware/auth0-middleware");
const receiptService = require("../services/receipt.service");

const getReceiptList = async (req, res) => {
  try {
    const filter = req?.query;
    const response = await receiptService.getReceiptList(filter);
    return res
      .status(200)
      .json({ message: "Success", data: response?.res || [] });
  } catch (error) {
    console.error("Error in getReceiptList:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const saveOrUnsaveReceipt = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { receiptId, action } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!receiptId || !action) {
      return res.status(400).json({ message: "Missing receiptId or action" });
    }
    if (action === "save") {
      // Save Receipt
      const saveReceipt = await receiptService.saveReceipt(receiptId, userId);
      return res
        .status(200)
        .json({ message: "Receipt saved successfully", saveReceipt });
    } else if (action === "unsave") {
      // Unsave Receipt
      await receiptService.unsaveReceipt(receiptId, userId);
      return res.status(200).json({ message: "Receipt unsaved successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'save' or 'unsave'." });
    }
  } catch (error) {
    console.error("Error in saveOrUnsaveReceipt:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { getReceiptList, saveOrUnsaveReceipt };
