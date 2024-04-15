import Client from "../models/Customer.js";
import User from "../models/User.js";
import Action from "../models/Action.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Client.find({ role: "customer" }).select("-supporting_document");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};  

export const getActions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const actions = await Action.find({
      $or: [
        
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Action.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      actions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
