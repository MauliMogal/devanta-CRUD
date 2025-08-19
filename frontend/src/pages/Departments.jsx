import { useState, useEffect } from "react";
import API from "../../../frontend/src/API/api";
import Header from "../components/Header";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [plants, setPlants] = useState([]);
  const [name, setName] = useState("");
  const [plantId, setPlantId] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const plantsRes = await API.get("/api/plants");
    setPlants(plantsRes.data);
    const deptRes   = await API.get("/api/departments");
    setDepartments(deptRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!name || !plantId) return;
    if (editId) {
      await API.put(`/departments/${editId}`, { name, plantId });
      setEditId(null);
    } else {
      await API.post("/departments", { name, plantId });
    }
    setName("");
    setPlantId("");
    fetchData();
  };

  const handleEdit = (dept) => {
    setEditId(dept._id);
    setName(dept.name);
    setPlantId(dept.plantId);
  };

  const handleDelete = async (id) => {
    await API.delete(`/departments/${id}`);
    fetchData();
  };

  return (
    <>
      <Header/>
    <div className="container">
      <h2>Departments</h2>
      <input type="text" placeholder="Department Name" value={name} onChange={e => setName(e.target.value)} />
      <select value={plantId} onChange={e => setPlantId(e.target.value)}>
        <option value="">Select Plant</option>
        {plants.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>
      <button className="add" onClick={handleAdd}>{editId ? "Update" : "Add"}</button>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Plant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(d => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{plants.find(p => p._id === d.plantId)?.name}</td>
              <td className="actions">
                <button className="edit" onClick={() => handleEdit(d)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(d._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Departments;
