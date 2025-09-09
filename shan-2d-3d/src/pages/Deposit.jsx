import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/apiService';

const Deposit = () => {
  const [formData, setFormData] = useState({
    agent_payment_type: '',
    amount: '',
    reference_number: '',
    receipt_image: null
  });
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadPaymentTypes();
  }, []);

  const loadPaymentTypes = async () => {
    try {
      const result = await apiService.getAgentPaymentTypes();
      console.log('Payment types result:', result);
      if (result.success) {
        // Handle different response formats
        const data = result.data;
        if (Array.isArray(data)) {
          setPaymentTypes(data);
        } else if (data && Array.isArray(data.data)) {
          setPaymentTypes(data.data);
        } else {
          setPaymentTypes([]);
        }
      } else {
        setPaymentTypes([]);
      }
    } catch (error) {
      console.error('Error loading payment types:', error);
      setPaymentTypes([]);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'receipt_image') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const depositData = new FormData();
      depositData.append('agent_payment_type', formData.agent_payment_type);
      depositData.append('amount', formData.amount);
      depositData.append('reference_number', formData.reference_number);
      
      if (formData.receipt_image) {
        depositData.append('receipt_image', formData.receipt_image);
      }

      const result = await apiService.deposit(depositData);
      
      if (result.success) {
        setSuccess('Deposit request submitted successfully!');
        setFormData({
          agent_payment_type: '',
          amount: '',
          reference_number: '',
          receipt_image: null
        });
        // Reset file input
        document.getElementById('receipt_image').value = '';
      } else {
        setError(result.message || 'Failed to submit deposit request');
      }
    } catch (error) {
      console.error('Deposit error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Top Navigation Bar */}
      <nav className="bg-transparent">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <img 
              src="/TemplateData/shan.jpg" 
              alt="GoldenMM Logo" 
              className="w-10 h-10 rounded-full border-2 border-gold"
            />
            <h1 className="text-white font-bold text-lg md:text-xl">GoldenMM</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white hover:text-gold transition-colors duration-300 p-2 rounded-full hover:bg-white hover:bg-opacity-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Deposit Funds</h2>
          <p className="text-gold text-sm md:text-base">Add money to your gaming account</p>
        </div>

        {/* Balance Card */}
        <div className="glass-effect rounded-xl p-6 mb-8 max-w-md mx-auto">
          <div className="text-center">
            <h3 className="text-white text-lg font-bold mb-2">Current Balance</h3>
            <div className="text-2xl font-bold text-gold">
              {user?.balanceFloat ? `${user.balanceFloat.toLocaleString()} MMK` : '0 MMK'}
            </div>
          </div>
        </div>

        {/* Deposit Form */}
        <div className="glass-effect rounded-2xl p-6 md:p-8 shadow-2xl max-w-md mx-auto">
          <h3 className="text-white text-xl font-bold text-center mb-6">Deposit Request</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Payment Type */}
            <div>
              <label htmlFor="agent_payment_type" className="block text-white text-sm font-medium mb-2">
                Payment Method <span className="text-red-400">*</span>
              </label>
              <select
                id="agent_payment_type"
                name="agent_payment_type"
                value={formData.agent_payment_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:border-gold transition-all duration-300"
              >
                <option value="" className="bg-gray-800">Select payment method</option>
                {Array.isArray(paymentTypes) && paymentTypes.map((type) => (
                  <option key={type.id} value={type.id} className="bg-gray-800">
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-white text-sm font-medium mb-2">
                Amount (MMK) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="1000"
                className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-gold transition-all duration-300"
                placeholder="Enter amount"
              />
            </div>

            {/* Reference Number */}
            <div>
              <label htmlFor="reference_number" className="block text-white text-sm font-medium mb-2">
                Reference Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="reference_number"
                name="reference_number"
                value={formData.reference_number}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-gold transition-all duration-300"
                placeholder="Enter reference number"
              />
            </div>

            {/* Receipt Image */}
            <div>
              <label htmlFor="receipt_image" className="block text-white text-sm font-medium mb-2">
                Receipt Image (Optional)
              </label>
              <input
                type="file"
                id="receipt_image"
                name="receipt_image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:border-gold transition-all duration-300"
              />
              <p className="text-gray-400 text-xs mt-1">Upload receipt image for faster processing</p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-300 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gold focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Deposit Request'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
