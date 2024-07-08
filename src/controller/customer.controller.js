import fs from "fs";
import path from "path";
import express from "express";
const app = express();

app.use(express.json());

const filePath = path.resolve(process.cwd(), "./data/customer.json");

export const findCustomer = (_, response) => {
  fs.readFile(filePath, (error, data) => {
    if (error) throw error;
    const existingData = JSON.parse(data);
    response.status(200).json(existingData);
  });
};

export const postCustomer = (request, response) => {
  const { body } = request;
  
  fs.readFile(filePath, (error, data) => {
    if (error) throw error;
    const existingData = JSON.parse(data);

    // Check for duplication
    const isDuplicate = existingData.some(
      (customer) => customer.id === body.id
    );

    if (isDuplicate) {
      return response.status(400).json({ message: "Customer already exists" });
    }

    existingData.push(body);

    fs.writeFile(filePath, JSON.stringify(existingData), (error) => {
      if (error) throw error;
      response.status(200).json({ message: "Success" });
    });
  });
};

export const editCustomer = (request, response) => {
  const { id } = request.params;
  const { body } = request;

  fs.readFile(filePath, (error, data) => {
    if (error) throw error;
    let existingData = JSON.parse(data);

    const customerIndex = existingData.findIndex(
      (customer) => customer.id === id
    );

    if (customerIndex === -1) {
      return response.status(404).json({ message: "Customer not found" });
    }

    existingData[customerIndex] = { ...existingData[customerIndex], ...body };

    fs.writeFile(filePath, JSON.stringify(existingData), (error) => {
      if (error) throw error;
      response.status(200).json({ message: "Customer updated successfully" });
    });
  });
};

export const deleteCustomer = (request, response) => {
  const { id } = request.params;

  fs.readFile(filePath, (error, data) => {
    if (error) throw error;
    let existingData = JSON.parse(data);

    const customerIndex = existingData.findIndex(
      (customer) => customer.id === id
    );

    if (customerIndex === -1) {
      return response.status(404).json({ message: "Customer not found" });
    }

    existingData = existingData.filter((customer) => customer.id !== id);

    fs.writeFile(filePath, JSON.stringify(existingData), (error) => {
      if (error) throw error;
      response.status(200).json({ message: "Customer deleted successfully" });
    });
  });
};

// Define routes
app.get("/customers", findCustomer);
app.post("/customers", postCustomer);
app.put("/customers/:id", editCustomer);
app.delete("/customers/:id", deleteCustomer);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
