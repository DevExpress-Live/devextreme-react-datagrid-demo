const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const connection = mongoose.connect("mongodb://127.0.0.1:27017/dx-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (!connection) {
  console.log("Error connecting db");
} else {
  console.log("Db connected successfully");
}

// #region Employee Schema
const EmployeeSchema = mongoose.Schema({
  employee_id: String,
  name: String,
  job_title: String,
  department: String,
  email: String,
  phone: String,
  is_active: Boolean,
  hire_date: Date,
});

const Employee = mongoose.model("Employee", EmployeeSchema);
// #endregion

// #region Customer Schema
const CustomerSchema = mongoose.Schema({
  customer_id: String,
  name: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  email: String,
});
const Customer = mongoose.model("Customer", CustomerSchema);
// #endregion

app.use(cors());
app.use(express.json());

// #region Employee Routes
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/employees/count", async (req, res) => {
  try {
    const employees = await Employee.countDocuments();
    res.json(employees).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/api/employees", async (req, res) => {
  const employee = new Employee({
    employee_id: req.body.employee_id,
    name: req.body.name,
    job_title: req.body.job_title,
    department: req.body.department,
    email: req.body.email,
    phone: req.body.phone,
    is_active: req.body.is_active,
    hire_date: req.body.hire_date,
  });

  try {
    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/api/employees/:id", async (req, res) => {
  try {
    await Employee.updateOne(
      { _id: req.params.id },
      {
        $set: {
          employee_id: req.body.employee_id,
          name: req.body.name,
          job_title: req.body.job_title,
          department: req.body.department,
          email: req.body.email,
          phone: req.body.phone,
          is_active: req.body.is_active,
          hire_date: req.body.hire_date,
        },
      }
    );
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    const removedEmployee = await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json(removedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

// #endregion

// #region Customer Routes
app.get("/api/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/customers/count", async (req, res) => {
  try {
    const customers = await Customer.countDocuments();
    res.json(customers).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/api/customers", async (req, res) => {
  const customer = new Customer({
    customer_id: req.body.customer_id,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    email: req.body.email,
  });

  try {
    const savedCustomer = await customer.save();
    res.json(savedCustomer);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/api/customers/:id", async (req, res) => {
  try {
    await Customer.updateOne(
      { _id: req.params.id },
      {
        $set: {
          customer_id: req.body.customer_id,
          name: req.body.name,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          phone: req.body.phone,
          email: req.body.email,
        },
      }
    );
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/api/customers/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const removedCustomer = await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json(removedCustomer);
  } catch (err) {
    res.status(500).json(err);
  }
});
// #endregion

app.listen(8000, () => {
  console.log("Server is running...");
});
