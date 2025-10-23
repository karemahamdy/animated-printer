import React from 'react';
import { ArrowLeft, Share2, User } from 'lucide-react';

export default function PaymentStatus() {
  const participants = [
    { name: 'You', paid: true, avatar: 'bg-blue-500' },
    { name: 'Olabode', paid: true, avatar: 'bg-blue-400' },
    { name: 'Lukmon', paid: true, avatar: 'bg-red-500' },
    { name: 'Hope', paid: false, avatar: 'bg-blue-300' },
    { name: 'Dara', paid: false, avatar: 'bg-purple-400' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-xl bg-[#f8f9fc]  shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 text-black">
          <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full border-2 border-gray-200">
            <ArrowLeft className="w-6 h-6 border-gray-200" />
          </button>
          <h1 className="text-md font-bold tracking-wider">Payment Status</h1>
          <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        <div className="mx-6 mb-6">
          <div className="relative mt-3 w-full rounded-2xl pt-4">
            <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-[#636363] to-[#333333] rounded-2xl">
              <div className="max-w-[92%] mx-auto z-22 h-9 rounded-2xl bg-black w-full mt-4"></div>
              
              <div className="rounded-md absolute inset-0 w-full  h-24 z-22 top-0 bg-linear-to-b from-black "></div>
            </div>
          </div>
          <div className="relative z-8 bg-white rounded-2xl p-6 mt-2 shadow-lg w-[90%] mx-auto">
              {/* Invoice Header */}
            <h2 className="tracking-wider text-center text-base font-medium text-gray-800 p-2 mb-6 border-b-2  border-t-2 border-dashed">
                Trip Invoice - Japan Summer 2025
              </h2>

              {/* Total Amount */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">Total</span>
                <span className="text-gray-900 font-semibold text-lg">$30,000</span>
              </div>

              {/* Per Person */}
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 mb-6">
                <span className="text-gray-600 text-sm">Per Person</span>
                <span className="text-gray-900 font-semibold">$6,000</span>
              </div>

              {/* Participants List */}
              <div className="space-y-3 mb-6 ">
                {participants.map((participant, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b-1 border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${participant.avatar} flex items-center justify-center `}>
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-800 font-medium">{participant.name}</span>
                    </div>
                    {participant.paid ? (
                      <div className="flex items-center gap-1.5 text-gray-500 p-2 border-2 border-gray-200 rounded-lg">
                        <div className="w-5 h-5 bg-[#05df72] rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Paid</span>
                      </div>
                    ) : (
                        <div className="flex items-center gap-1.5 text-gray-500  p-2 border-2 border-gray-200 rounded-lg">
                          <div className="w-5 h-5 bg-[#ff8904] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <span className="text-sm font-medium">Unpaid</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Payment Progress */}
            <div className="border-1 border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium text-sm">Payment Status</span>
                  <span className="text-gray-900 font-bold">UNPAID</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#05df72] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="h-1 bg-[#05df72] flex-1 rounded"></div>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#05df72] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="h-1 bg-[#05df72] flex-1 rounded"></div>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#05df72] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="h-1 bg-gray-300 flex-1 rounded"></div>
                  </div>
                  <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0"></div>
                </div>
              
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="border-2 border-black bg-gray-900 text-white rounded-full py-1 px-2 font-medium text-sm hover:bg-gray-800 transition">
                  Send Reminder
                </button>
              <button className="text-gray-900 border border-gray-300 rounded-full py-1 px-2 font-medium text-sm bg-gray-50 transition shadow-amber-50">
                  Download Invoice
                </button>
              </div>
            </div>
          
        </div>

        {/* Payment Method */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Payment Method</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">Visa Ending 2986</span>
              <div className="w-12 h-8 bg-blue-600 rounded"></div>
            </div>
          </div>
        </div>

        {/* Pay Now Button */}
        <div className="px-6 pb-6">
          <button className="w-full bg-gray-800 text-white rounded-xl py-2 font-light text-base hover:bg-gray-800 transition">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}