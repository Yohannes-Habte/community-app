import { useState } from "react";
import "./BudgetForm.scss";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaCalendar,
  FaListAlt,
  FaTag,
  FaFileAlt,
  FaDollarSign,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import {
  API,
  cloud_File_URL,
  cloud_name,
  upload_preset,
} from "../../../utile/security/secreteKey";

const initialState = {
  year: "",
  plannedBudget: [
    {
      referenceNumber: "",
      itemName: "",
      unitCost: "",
      quantity: "",
      description:
        "The total cost will be calculated once all fields are filled.",
    },
  ],
  budgetStatus: "",
  remarks: "",
  diocesesConfirmation: null,
};

const BudgetForm = () => {
  const [formData, setFormData] = useState(initialState);

  const { year, plannedBudget, budgetStatus, remarks, diocesesConfirmation } =
    formData;

  // Handle changes for simple inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for the plannedBudget array
  const handlePlannedBudgetChange = (index, e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newPlannedBudget = [...prevData.plannedBudget];
      newPlannedBudget[index][name] = value;

      // Dynamically update the description if relevant fields are modified
      const { itemName, unitCost, quantity } = newPlannedBudget[index];

      if (name === "itemName" || name === "unitCost" || name === "quantity") {
        const parsedUnitCost = parseFloat(unitCost) || 0;
        const parsedQuantity = parseInt(quantity) || 0;

        // Format the cost for better readability
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
        });

        const formattedCost = formatter.format(parsedUnitCost * parsedQuantity);
        const participantsText =
          parsedQuantity === 1 ? "participant" : "participants";

        newPlannedBudget[index].description = `The total cost of the ${
          itemName || "item"
        } is calculated by multiplying the unit cost ${formatter.format(
          parsedUnitCost
        )}, which represents one person, by the number of ${participantsText} (${parsedQuantity}), resulting in ${formattedCost}.`;
      }

      return { ...prevData, plannedBudget: newPlannedBudget };
    });
  };

  // Add a new plannedBudget item
  const addPlannedBudget = () => {
    setFormData((prevData) => ({
      ...prevData,
      plannedBudget: [
        ...prevData.plannedBudget,
        {
          referenceNumber: "",
          itemName: "",
          unitCost: "",
          quantity: "",
          description: "",
        },
      ],
    }));
  };

  // Remove a plannedBudget item
  const removePlannedBudget = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      plannedBudget: prevData.plannedBudget.filter((_, i) => i !== index),
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF document.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("The file size must be less than 5MB.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      diocesesConfirmation: file,
    }));
  };

  // Reset the form
  const handleReset = () => {
    setFormData(initialState);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const documentPDF = new FormData();
      documentPDF.append("file", diocesesConfirmation);
      documentPDF.append("cloud_name", cloud_name);
      documentPDF.append("upload_preset", upload_preset);

      const response = await axios.post(cloud_File_URL, documentPDF, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Extract the secure URL from the response
      const PDFUrl = response.data.secure_url;
      if (!PDFUrl) {
        throw new Error("Failed to retrieve uploaded file URL.");
      }

      const formDataToSend = {
        year,
        plannedBudget,
        budgetStatus,
        remarks,
        diocesesConfirmation: PDFUrl,
      };

      const { data } = await axios.post(`${API}/budgets/new`, formDataToSend);
      toast.success(data.message || "Budget submitted successfully!");
      handleReset();
    } catch (error) {
      console.error("Error submitting budget:", error);
      toast.error(error.response?.data?.message || "Error submitting budget.");
    }
  };

  return (
    <section className="create-annual-budget-form-wrapper">
      <h2 className="create-annual-budget-form-title">Create Annual Budget</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="create-annual-budget-form"
      >
        {/* Year */}
        <div className="input-container">
          <FaCalendar className="input-icon" />
          <input
            type="text"
            id="year"
            name="year"
            value={year}
            onChange={handleChange}
            placeholder="Enter budget year"
            className="input-field"
            aria-label="Year"
          />
          <label htmlFor="year" className="input-label">
            Year
          </label>
          <span className="input-highlight"></span>
        </div>

        <article className="planned-budgets-items-container">
          <h3 className="planned-budgets-items-title">Planned Budget</h3>
          {plannedBudget.map((budget, index) => (
            <div key={index} className="budget-item-container">
              <div className="inputs-wrapper">
                <div className="input-container">
                  <FaTag className="input-icon" />
                  <input
                    type="text"
                    name="referenceNumber"
                    value={budget.referenceNumber}
                    onChange={(e) => handlePlannedBudgetChange(index, e)}
                    placeholder="Reference Number"
                    aria-label="Reference Number"
                    className="input-field"
                  />
                  <label htmlFor="referenceNumber" className="input-label">
                    Reference Number
                  </label>
                  <span className="input-highlight"></span>
                </div>

                <div className="input-container">
                  <FaListAlt className="input-icon" />
                  <input
                    type="text"
                    name="itemName"
                    value={budget.itemName}
                    onChange={(e) => handlePlannedBudgetChange(index, e)}
                    placeholder="Item Name"
                    aria-label="Item Name"
                    className="input-field"
                  />
                  <label htmlFor="itemName" className="input-label">
                    Item Name
                  </label>
                  <span className="input-highlight"></span>
                </div>

                <div className="input-container">
                  <FaDollarSign className="input-icon" />
                  <input
                    type="number"
                    name="unitCost"
                    value={budget.unitCost}
                    onChange={(e) => handlePlannedBudgetChange(index, e)}
                    placeholder="Unit Cost"
                    aria-label="Unit Cost"
                    className="input-field"
                  />
                  <label htmlFor="unitCost" className="input-label">
                    Unit Cost
                  </label>
                  <span className="input-highlight"></span>
                </div>

                <div className="input-container">
                  <FaDollarSign className="input-icon" />
                  <input
                    type="number"
                    name="quantity"
                    value={budget.quantity}
                    onChange={(e) => handlePlannedBudgetChange(index, e)}
                    placeholder="Quantity"
                    aria-label="Quantity"
                    className="input-field"
                  />
                  <label htmlFor="quantity" className="input-label">
                    Quantity
                  </label>
                  <span className="input-highlight"></span>
                </div>
              </div>

              <div className="input-container">
                <FaListAlt className="input-icon" />
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  cols={20}
                  value={budget.description}
                  onChange={(e) => handlePlannedBudgetChange(index, e)}
                  placeholder="Description"
                  aria-label="Description"
                  className="input-field"
                ></textarea>
                <label htmlFor="description" className="input-label">
                  Description
                </label>
                <span className="input-highlight"></span>
              </div>

              <button
                type="button"
                className="remove-item-btn"
                onClick={() => removePlannedBudget(index)}
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))}
        </article>

        <button
          type="button"
          className="add-item-btn"
          onClick={addPlannedBudget}
        >
          <FaPlus /> Add Item
        </button>

        {/* File Input */}
        <div className="input-container">
          <FaFileAlt className="input-icon" />
          <input
            type="file"
            id="diocesesConfirmation"
            name="diocesesConfirmation"
            accept=".pdf"
            onChange={handleFileChange}
            aria-label="Upload a PDF of the Dioceses Confirmation Document"
            className="input-field"
          />
          <label htmlFor="diocesesConfirmation" className="input-label">
            Dioceses Confirmation Document
          </label>

          <span className="input-highlight"></span>
        </div>

        {/* Budget Status */}
        <div className="input-container">
          <FaListAlt className="input-icon" />
          <select
            name="budgetStatus"
            id="budgetStatus"
            value={budgetStatus}
            onChange={handleChange}
            placeholder="Enter budget status"
            aria-label="Budget Status"
            className="input-field"
          >
            <option value="default">Select Budget Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <label htmlFor="budgetStatus" className="input-label"></label>
          <span className="input-highlight"></span>
        </div>

        {/* Remarks */}
        <div className="input-container">
          <FaListAlt className="input-icon" />
          <textarea
            name="remarks"
            value={remarks}
            onChange={handleChange}
            placeholder="Enter remarks"
            aria-label="Remarks"
            className="input-field"
          ></textarea>
          <label htmlFor="remarks" className="input-label">
            Remarks
          </label>
          <span className="input-highlight"></span>
        </div>

        <button type="submit" className="create-annual-budget-form-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default BudgetForm;
