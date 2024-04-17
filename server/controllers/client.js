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
export const addCustomer = async (req, res) => {
  const customerObj = req.body; // the request body contains all fields for the new customer
  try {
    // Create a new instance of the Client model with the customer data
    const newCustomer = new Client(customerObj);

    // Save the new customer to the database
    await newCustomer.save();

    // Returning the newly created customer in the response
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateCustomer = async (req, res) => {
  const customerId = req.params.id; // Extract the customer ID from the request parameters
  const updatedCustomerData = req.body; // Extract the updated customer data from the request body

  try {
    // Find the customer by ID in the database
    const customer = await Client.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Update the customer's fields with the new values
    Object.assign(customer, updatedCustomerData);

    // Save the updated customer to the database
    await customer.save();

    // Return the updated customer in the response
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

export const updateAction = async (req, res) => {
  const actionId = req.params.id; // Extract the action ID from the request parameters
  const updatedActionData = req.body; // Extract the updated action data from the request body

  try {
    // Find the action by ID in the database
    const action = await Action.findById(actionId);

    if (!action) {
      return res.status(404).json({ message: "Action not found" });
    }

    // Update the action's fields with the new values
    Object.assign(action, updatedActionData);

    // Save the updated action to the database
    await action.save();

    // Return the updated action in the response
    res.status(200).json(action);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};