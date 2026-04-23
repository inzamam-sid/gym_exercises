import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import axios from '../../api/axiosConfig';

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/members');
      setMembers(response.data.data.members);
    } catch (error) {
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await axios.put(`/members/${editingMember._id}`, formData);
        toast.success('Member updated successfully');
      } else {
        await axios.post('/members', formData);
        toast.success('Member added successfully');
      }
      setShowModal(false);
      setEditingMember(null);
      setFormData({ name: '', email: '', phone: '', password: '' });
      fetchMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await axios.delete(`/members/${id}`);
        toast.success('Member deleted successfully');
        fetchMembers();
      } catch (error) {
        toast.error('Failed to delete member');
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`/members/${id}/status`);
      toast.success(`Member ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchMembers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
        <button
          onClick={() => {
            setEditingMember(null);
            setFormData({ name: '', email: '', phone: '', password: '' });
            setShowModal(true);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700"
        >
          <UserPlusIcon className="w-5 h-5" />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Phone</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{member.name}</td>
                <td className="py-3 px-4 text-gray-600">{member.email}</td>
                <td className="py-3 px-4 text-gray-600">{member.phone || '-'}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleStatus(member._id, member.isActive)}
                    className={`px-2 py-1 text-xs rounded-full ${
                      member.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {member.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingMember(member);
                        setFormData({
                          name: member.name,
                          email: member.email,
                          phone: member.phone || '',
                          password: ''
                        });
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingMember ? 'Edit Member' : 'Add New Member'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {!editingMember && (
                  <input
                    type="password"
                    placeholder="Password (default: member123)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                )}
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
                  {editingMember ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersList;