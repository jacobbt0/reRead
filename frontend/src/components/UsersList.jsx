import { useState } from 'react'
const UsersList = ({ users }) => {

    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (

        <div className="max-w-7xl mx-auto p-6 text-emerald-600">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto text-black">
                    <thead className="bg-gray-100">
                        <tr >
                            <th className="py-2 px-4 border-b text-left">IDt</th>
                            <th className="py-2 px-4 border-b text-left"> User ID</th>
                            <th className="py-2 px-4 border-b text-left">Name</th>
                            <th className="py-2 px-4 border-b text-left">Phone</th>
                            <th className="py-2 px-4 border-b text-left">Email</th>



                        </tr>
                    </thead>
                    <tbody>
                        {users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, i) => {
                            return (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b">{i + 1}</td>
                                    <td className="py-2 px-4 border-b">{user._id}</td>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.phone}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                   

                                </tr>
                            )
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
                        Page {page + 1} of {Math.ceil(users.length / rowsPerPage)}
                    </span>
                    <button
                        className="px-4 py-2 text-gray-300 bg-emerald-700 rounded-md disabled:opacity-50"
                        onClick={(e) => handleChangePage(e, page + 1)}
                        disabled={page === Math.ceil(users.length / rowsPerPage) - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsersList;
