import React, { useEffect, useState } from "react";
import axios from "axios";

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [name, setName] = useState("");
  const [editingBuyer, setEditingBuyer] = useState(null);

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/buyers`);
      setBuyers(response.data);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  const addBuyer = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/buyers`, {
        name,
      });
      setBuyers([...buyers, response.data]);
      setName("");
    } catch (error) {
      console.error("Error adding buyer:", error);
    }
  };

  const updateBuyer = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/buyers/${editingBuyer.id}`,
        { name }
      );
      setBuyers(
        buyers.map((buyer) =>
          buyer.id === editingBuyer.id ? response.data : buyer
        )
      );
      setEditingBuyer(null);
      setName("");
    } catch (error) {
      console.error("Error updating buyer:", error);
    }
  };

  const deleteBuyer = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/buyers/${id}`);
      setBuyers(buyers.filter((buyer) => buyer.id !== id));
    } catch (error) {
      console.error("Error deleting buyer:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingBuyer) {
      updateBuyer();
    } else {
      addBuyer();
    }
  };

  const startEditing = (buyer) => {
    setEditingBuyer(buyer);
    setName(buyer.name);
  };

  return (
    <div>
      <h1>Buyers</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter buyer name"
        />
        <button type="submit">
          {editingBuyer ? "Update Buyer" : "Add Buyer"}
        </button>
      </form>
      <ul>
        {buyers.map((buyer) => (
          <li key={buyer.id}>
            {buyer.name}
            <button onClick={() => startEditing(buyer)}>Edit</button>
            <button onClick={() => deleteBuyer(buyer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buyers;
