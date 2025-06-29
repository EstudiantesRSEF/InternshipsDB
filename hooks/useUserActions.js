import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth'

export const useUserActions = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const user = useAuth()


  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove = async (email, approved) => {
    try {
      const emailUserLogged = user.email    
      const res = await axios.post('/api/users/approveUser', { email, approved, emailUserLogged });
      await loadUsers();
      showMessage(res.data.message);
    } catch (err) {
      showMessage(err.response?.data?.error || 'Error al cambiar estado', 'error');
    }
  };

  const handleDelete = async (email) => {
    try {
      const emailUserLogged = user.email    
      const res = await axios.post('/api/users/deleteUser', { email, emailUserLogged });
      await loadUsers();
      showMessage(res.data.message);
    } catch (err) {
      showMessage(err.response?.data?.error || 'Error al eliminar usuario', 'error');
    }
  };

  const loadUsers = async () => {
    try {
      const res = await axios.get('/api/users/getUsers');
      setUsers(res.data);
    } catch (err) {
      showMessage('Error al cargar usuarios', 'error');
    }
  };
  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
  };

  const handleCreateUser = async (userData) => {
    try {
      const res = await axios.post('/api/users/createUser', userData);
      await loadUsers();
      showMessage(res.data.message);
      return true;
    } catch (err) {
      showMessage(err.response?.data?.error || 'Error al crear usuario', 'error');
      return false;
    }
  };

  const handleUpdateUser = async (updatedUserData) => {
    try {
      console.log(updatedUserData)
      const res = await axios.put('/api/users/updateUser', updatedUserData);
      await loadUsers();
      showMessage('Usuario actualizado correctamente');
      return true;
    } catch (err) {
      showMessage('Error al actualizar el usuario', 'error');
      return false;
    }
  };

  const toggleUserRole = async (user, newRole) => {
    try {
      const res = await axios.post('/api/users/makeAdmin', { email: user.email, role: newRole });
      await loadUsers();
      showMessage(res.data.message);
    } catch (err) {
      showMessage(err.response?.data?.error || 'Error al actualizar rol', 'error');
    }
  };

  const handleBulkUpload = async (usersData) => {
    try {
      if(usersData.length < 100){
      const res = await axios.post('/api/users/bulkCreateUsers', { users: usersData });
      //console.log(res)
      await loadUsers();
      showMessage(res.data.message);
    }else{
      showMessage("No se pueden cargar más de 100 usuarios de una vez");

    }
    } catch (err) {
      showMessage(err.response?.data?.error || 'Error al cargar usuarios masivamente', 'error');
    }
  };

  return {
    users, message, messageType, editingUser, setEditingUser,
    handleApprove, handleDelete, handleCreateUser,
    handleUpdateUser, toggleUserRole, handleBulkUpload,loadUsers 
  };
};
