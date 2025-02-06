import { useState } from 'react'
import  LoadingSpinner  from './LoadingSpinner'

const ReportsTable = ({ reports, loading }) => {
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) {
        <LoadingSpinner/>
    }

    return (
        <div className="max-w-7xl mx-auto p-6 text-emerald-600">
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto text-black">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">ID</th>
                            <th className="py-2 px-4 border-b text-left">User ID</th>
                            <th className="py-2 px-4 border-b text-left">Report Date</th>
                            <th className="py-2 px-4 border-b text-left">Reason</th>
                            <th className="py-2 px-4 border-b text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((report, i) => {
                            
                            const date = new Date(report.createdAt);
                            const formattedDate = date.toLocaleDateString('en-US')

                            return (
                                <tr key={report.id}>
                                    <td className="py-2 px-4 border-b">{i + 1}</td>
                                    <td className="py-2 px-4 border-b">{report.reportSenderId}</td>
                                    <td className="py-2 px-4 border-b">{formattedDate}</td> 
                                    <td className="py-2 px-4 border-b">{report.reportReason}</td>
                                    <td className="py-2 px-4 border-b">{report.reportDescription}</td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div>
                    <label className="mr-2 text-sm">Rows per page:</label>
                    <select
                        className="border rounded px-2 py-1"
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                    </select>
                </div>
                <div>
                    <button
                        className="px-4 py-2 text-gray-300  bg-emerald-700 rounded-md disabled:opacity-50"
                        onClick={(e) => handleChangePage(e, page - 1)}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    <span className="mx-2 text-sm">
                        Page {page + 1} of {Math.ceil(reports.length / rowsPerPage)}
                    </span>
                    <button
                        className="px-4 py-2 text-gray-300 bg-emerald-700 rounded-md disabled:opacity-50"
                        onClick={(e) => handleChangePage(e, page + 1)}
                        disabled={page === Math.ceil(reports.length / rowsPerPage) - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};



export default ReportsTable