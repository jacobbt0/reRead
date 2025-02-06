import { useState } from 'react'
import { useReportStore } from '../stores/useReportStore'
import toast from "react-hot-toast"

const ReportPage = () => {
  const [reportReason, setReason] = useState('')
  const [reportDescription, setDescription] = useState('')
  const { sendReport } = useReportStore()


  const handleSubmit = async (e) => {
    e.preventDefault();

    const reportData = {
      reportReason,
      reportDescription,
    }

    try {

      await sendReport(reportData)
      setReason('')
      setDescription('')
      return toast.success("Report sended successfully")
      
    } catch {
      return toast.error("Can't send Report")
    }
   
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg text-gray-900">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Report a User</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label htmlFor="reportReason" className="block text-lg font-medium text-gray-700">
            Reason for Report:
          </label>
          <select
            id="reason"
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900"
            value={reportReason}
            onChange={(e) => setReason(e.target.value)}
            required
          >
            <option value="">Select a Reason</option>
            <option value="Spam">Spam</option>
            <option value="Inappropriate Content">Inappropriate Content</option>
            <option value="Fake Account">Fake Account</option>
            <option value="Other">Other</option>
          </select>
        </div>


        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">
            Detailed Description:
          </label>
          <textarea
            id="description"
            rows="6"
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900"
            value={reportDescription}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>


        <div className="text-center">
          <button
            type="submit"
            className= "bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md text-xl"
          >
            SUBMIT
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default ReportPage;
