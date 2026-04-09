import React, { useState } from "react";

function App() {
  const [tenants, setTenants] = useState([
    { id: 1, name: "Company A", users: ["John", "David"] },
    { id: 2, name: "Company B", users: ["Sara"] }
  ]);

  const [selectedTenant, setSelectedTenant] = useState(null);
  const [newUser, setNewUser] = useState("");

  const addUser = () => {
    if (!newUser || !selectedTenant) return;

    setTenants(
      tenants.map((tenant) =>
        tenant.id === selectedTenant.id
          ? { ...tenant, users: [...tenant.users, newUser] }
          : tenant
      )
    );

    setNewUser("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Multi-Tenant Admin Panel</h1>

      <h3>Select Tenant</h3>
      {tenants.map((tenant) => (
        <button
          key={tenant.id}
          onClick={() => setSelectedTenant(tenant)}
          style={{ margin: "5px" }}
        >
          {tenant.name}
        </button>
      ))}

      {selectedTenant && (
        <div style={{ marginTop: "20px" }}>
          <h2>{selectedTenant.name} - Users</h2>

          <input
            placeholder="New User"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />

          <button onClick={addUser}>Add User</button>

          <ul>
            {tenants
              .find((t) => t.id === selectedTenant.id)
              .users.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;