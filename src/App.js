import { useEffect, useState } from 'react';
import './App.module.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getData = async () => {
    const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
    const respData = await response.json();
    setData(respData);
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <h3 style={{ textAlign: 'center' }}>Employee Data Table</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display:'flex', justifyContent:'space-around', alignItems:'center'}}>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <p>{currentPage}</p>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= data.length}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
