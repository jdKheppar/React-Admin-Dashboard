import User from "../models/User.js";
import Client from "../models/Customer.js";


export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export const getClient = async (req, res) => {
    try {
      const { id } = req.params;
      const client = await Client.findById(id);
      res.status(200).json(client);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


  
