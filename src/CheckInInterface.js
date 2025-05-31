import React, { useState } from 'react';
import { User, Calendar, Phone, CreditCard, Key, CheckCircle } from 'lucide-react';

const CheckInInterface = () => {
  const [formData, setFormData] = useState({
    name: '',
    idCard: '',
    phone: '',
    roomType: '',
    checkInDate: '',
    checkOutDate: '',
    roomNumber: ''
  });

  const [availableRooms, setAvailableRooms] = useState([
    { number: '101', type: '标准间', price: 299, status: 'available' },
    { number: '102', type: '标准间', price: 299, status: 'available' },
    { number: '201', type: '豪华间', price: 499, status: 'available' },
    { number: '301', type: '套房', price: 799, status: 'available' }
  ]);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoomSelect = (roomNumber, roomType) => {
    setFormData(prev => ({
      ...prev,
      roomNumber,
      roomType
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      // 这里应该调用实际的入住API
      console.log('入住信息:', formData);
    }, 2000);
  };

  const validateStep1 = () => {
    return formData.name && formData.idCard && formData.phone && 
           formData.checkInDate && formData.checkOutDate;
  };

  const validateStep2 = () => {
    return formData.roomNumber && formData.roomType;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题栏 */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            智能温控酒店入住系统
          </h1>
          <div className="flex justify-center space-x-8 mt-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <User className="w-5 h-5 mr-2" />
              <span>客户信息</span>
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <Key className="w-5 h-5 mr-2" />
              <span>选择房间</span>
            </div>
            <div className={`flex items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>入住完成</span>
            </div>
          </div>
        </div>

        {/* 步骤1：客户信息录入 */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              客户信息录入
            </h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  客户姓名 *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入客户姓名"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  身份证号 *
                </label>
                <input
                  type="text"
                  name="idCard"
                  value={formData.idCard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入身份证号"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  联系电话 *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入联系电话"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  入住日期 *
                </label>
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  退房日期 *
                </label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </form>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => validateStep1() && setStep(2)}
                disabled={!validateStep1()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                下一步
              </button>
            </div>
          </div>
        )}

        {/* 步骤2：选择房间 */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Key className="w-6 h-6 mr-2 text-blue-600" />
              选择房间
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {availableRooms.map((room) => (
                <div
                  key={room.number}
                  onClick={() => handleRoomSelect(room.number, room.type)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.roomNumber === room.number
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-semibold">房间 {room.number}</div>
                  <div className="text-sm text-gray-600">{room.type}</div>
                  <div className="text-lg font-bold text-blue-600 mt-2">
                    ¥{room.price}/晚
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                disabled={!validateStep2() || isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? '提交中...' : '完成入住'}
              </button>
            </div>
          </div>
        )}

             {/* 步骤3：入住完成 */}
             {step === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              入住完成
            </h2>
            <div className="text-gray-700 mb-6">
              您已成功入住！以下是您的入住信息：
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="mb-4">
                <strong>客户姓名：</strong> {formData.name}
              </div>
              <div className="mb-4">
                <strong>身份证号：</strong> {formData.idCard}
              </div>
              <div className="mb-4">
                <strong>联系电话：</strong> {formData.phone}
              </div>
              <div className="mb-4">
                <strong>入住日期：</strong> {formData.checkInDate}
              </div>
              <div className="mb-4">
                <strong>退房日期：</strong> {formData.checkOutDate}
              </div>
              <div className="mb-4">
                <strong>房间号码：</strong> {formData.roomNumber}
              </div>
              <div className="mb-4">
                <strong>房间类型：</strong> {formData.roomType}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                重新开始
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInInterface;

       
