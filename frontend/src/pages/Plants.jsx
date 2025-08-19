import { useState, useEffect } from "react";
import API from "../../../frontend/src/API/api"; // your axios instance

function Plants() {
  const [plants, setPlants] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchPlants = async () => {
    try {
      const res = await API.get("/api/plants");
      setPlants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleAdd = async () => {
    if (!name) return;
    if (editId) {
      await API.put(`/plants/${editId}`, { name });
      setEditId(null);
    } else {
      await API.post("/plants", { name });
    }
    setName("");
    fetchPlants();
  };

  const handleEdit = (plant) => {
    setEditId(plant._id);
    setName(plant.name);
  };

  const handleDelete = async (id) => {
    await API.delete(`/plants/${id}`);
    fetchPlants();
  };

  return (
    <div className="container">
      <h2>Plants</h2>
      <input type="text" placeholder="Plant Name" value={name} onChange={e => setName(e.target.value)} />
      <button className="add" onClick={handleAdd}>{editId ? "Update" : "Add"}</button>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td className="actions">
                <button className="edit" onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Plants;
