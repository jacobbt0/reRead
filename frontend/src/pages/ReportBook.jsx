import { useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useReportStore } from "../stores/useReportStore";
const ReportBook = () => {
  const { book } = useProductStore()
  const { sendReport } = useReportStore()
  const [formData, setFormData] = useState({
    reason: "",
    details: "",
    bookId : book?._id,

  });
  
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    sendReport(formData)
    console.log("Report submitted:", formData);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Report a Book</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
         

          <div>
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select a reason</option>
              <option value="Incorrect Information">Incorrect Information</option>
              <option value="Spam or Fraud">Spam or Fraud</option>
              <option value="Inappropriate Content">Inappropriate Content</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Provide more details"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportBook;
