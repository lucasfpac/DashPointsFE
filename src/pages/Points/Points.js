import React, { useState, useEffect } from 'react';
import { getPoints, addPoint } from '../../services/pointsService';
import { getStores } from '../../services/storeService';
import { getUsers } from '../../services/authService';
import { getCustomers } from '../../services/customerService'
import './Points.css';

function Points() {
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stores, setStores] = useState([]);
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [pointsList, setPointsList] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedStore, setSelectedStore] = useState("");

  useEffect(() => {
    // Check if access token is available before making requests
    const token = localStorage.getItem('access_token');
    if (token) {
      getUsers().then(response => setUsers(response.data.results));
      getStores().then(response => setStores(response.data.results));
      getCustomers().then(response => setCustomers(response.data.results));
      getPoints().then(response => setPointsList(response.data.results));
    } else {
      // Redirect to login if no token is found
      window.location.href = "/login";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPoint = {
      user: selectedUser,
      customer: selectedCustomer,
      store: selectedStore,
      value: parseFloat(value),
      date: date,
    };

    addPoint(newPoint).then(response => {
      setPointsList([...pointsList, response.data]);  // Adiciona o novo ponto à lista
      setValue("");
      setDate("");
      setSelectedUser("");
      setSelectedCustomer("");
      setSelectedStore("");
    });
  };

  // Função para encontrar o nome do usuário e da loja pelo ID
  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : "Desconhecido";
  };

  const getCustomerName = (custumerId) => {
    const customer = customers.find((c) => c.id === custumerId);
    return customer ? customer.name : "Desconhecido";
  };

  const getStoreName = (storeId) => {
    const store = stores.find((s) => s.id === storeId);
    return store ? store.name : "Desconhecido";
  };

  return (
    <div className="points-container">
      <h2>Gerenciamento de Pontos</h2>
      <form onSubmit={handleSubmit} className="points-form">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="points-input"
          required
        >
          <option value="">Selecione um usuário</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="points-input"
          required
        >
          <option value="">Selecione um cliente</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="points-input"
          required
        >
          <option value="">Selecione uma loja</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Valor em Reais"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="points-input"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="points-input"
          required
        />

        <button type="submit" className="points-btn">Adicionar Ponto</button>
      </form>

      <div className="points-list">
        <h3>Lista de Pontos</h3>
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Cliente</th>
              <th>Loja</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Voucher</th>
            </tr>
          </thead>
          <tbody>
            {pointsList.map((point) => (
              <tr key={point.id}>
                <td>{getUserName(point.user)}</td>
                <td>{getCustomerName(point.user)}</td>
                <td>{getStoreName(point.store)}</td>
                <td>R$ {point.value.toFixed(2)}</td>
                <td>{new Date(point.date).toLocaleDateString()}</td>
                <td><button className='voucher-btn'>Download Voucher</button></td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Points;
