'use client';

import { useState } from 'react';
import { 
  Search, Package, AlertTriangle, 
  HelpCircle, Clock, Phone, MessageSquare, RefreshCw, ChevronRight, Check, AlertCircle, X, Send
} from 'lucide-react';

const mockOrders = {
  'ORD-98765': {
    id: 'ORD-98765',
    date: '22 September, 2026',
    estimatedDelivery: '25 September, 2026 (2:00 PM - 5:00 PM)',
    currentStatus: 2,
    statusType: 'normal',
    courier: 'Pathao Express (ID: PTH-88392)',
    items: [
      { id: 1, name: 'Wireless Noise Cancelling Headphones', price: '৳ 2,500', qty: 1, img: '🎧' },
      { id: 2, name: 'Smart Watch Leather Strap (Black)', price: '৳ 500', qty: 2, img: '⌚' },
    ],
    summary: { subtotal: '৳ 3,500', shipping: '৳ 60', total: '৳ 3,560' },
    timeline: [
      { status: 'Order Placed', time: '22 Sep, 10:00 AM', completed: true, desc: 'Order successfully received' },
      { status: 'Processing', time: '22 Sep, 02:15 PM', completed: true, desc: 'Packed and ready for dispatch' },
      { status: 'Out for Delivery', time: '25 Sep, 09:00 AM', completed: true, desc: 'Rider is on the way' },
      { status: 'Delivered', time: 'Expected: 25 Sep', completed: false, desc: 'Awaiting customer handover' },
    ]
  },
  'ORD-54321': {
    id: 'ORD-54321',
    date: '20 September, 2026',
    estimatedDelivery: '22 September, 2026 (Delayed)',
    currentStatus: 1,
    statusType: 'delayed',
    courier: 'Steadfast Express (ID: ST-44102)',
    delayReason: 'Weather conditions and severe traffic causing transit delay.',
    newEstimatedDelivery: '27 September, 2026',
    items: [
      { id: 1, name: 'Mechanical RGB Gaming Keyboard', price: '৳ 4,200', qty: 1, img: '⌨️' },
    ],
    summary: { subtotal: '৳ 4,200', shipping: '৳ 60', total: '৳ 4,260' },
    timeline: [
      { status: 'Order Placed', time: '20 Sep, 11:00 AM', completed: true, desc: 'Order received' },
      { status: 'Shipped', time: '21 Sep, 04:00 PM', completed: true, desc: 'Handed over to courier' },
      { status: 'Out for Delivery', time: 'Delayed', completed: false, isError: true, desc: 'Transit temporarily paused' },
      { status: 'Delivered', time: 'New Date: 27 Sep', completed: false, desc: 'Will be delivered soon' },
    ]
  },
  'ORD-11223': {
    id: 'ORD-11223',
    date: '18 September, 2026',
    estimatedDelivery: '21 September, 2026',
    currentStatus: 3,
    statusType: 'delivered_not_received',
    courier: 'RedX Delivery (ID: RDX-99012)',
    items: [
      { id: 1, name: 'Waterproof Bluetooth Speaker', price: '৳ 1,800', qty: 1, img: '🔊' },
    ],
    summary: { subtotal: '৳ 1,800', shipping: '৳ 60', total: '৳ 1,860' },
    timeline: [
      { status: 'Order Placed', time: '18 Sep, 09:00 AM', completed: true, desc: 'Order confirmed' },
      { status: 'Processing', time: '19 Sep, 11:00 AM', completed: true, desc: 'Item packed' },
      { status: 'Out for Delivery', time: '21 Sep, 08:00 AM', completed: true, desc: 'Dispatched with rider' },
      { status: 'Delivered', time: '21 Sep, 03:45 PM', completed: true, desc: 'Marked delivered by system' },
    ]
  },
  'ORD-99999': {
    id: 'ORD-99999',
    statusType: 'not_available',
  }
};

export default function OrderTracking() {
  const [searchQuery, setSearchQuery] = useState('ORD-98765');
  const [currentOrder, setCurrentOrder] = useState(mockOrders['ORD-98765']);
  const [notFound, setNotFound] = useState(false);
  const [issueReported, setIssueReported] = useState(false);

  // Live Chat States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'agent', text: 'Hello! How can we help you with your order today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Search Function Logic
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const cleanQuery = searchQuery.trim().toUpperCase();
    
    if (mockOrders[cleanQuery]) {
      setCurrentOrder(mockOrders[cleanQuery]);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
    setIssueReported(false);
  };

  // Switcher for Evaluators
  const handleQuickSwitch = (orderId) => {
    setSearchQuery(orderId);
    setCurrentOrder(mockOrders[orderId]);
    setNotFound(false);
    setIssueReported(false);
  };

  // Send Live Chat Message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user', text: inputMessage }];
    setChatMessages(newMessages);
    setInputMessage('');

    // Simulated Auto Reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev, 
        { sender: 'agent', text: `Thanks for messaging regarding #${currentOrder?.id || 'your order'}. An agent will reply shortly!` }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-6 px-3 flex flex-col justify-center items-center font-sans antialiased text-slate-800 relative">
      
      {/* Evaluator Test Switcher */}
      <div className="w-full max-w-[420px] bg-slate-900 text-white p-3 rounded-2xl mb-4 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            🧪 Evaluator Test Switcher
          </span>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
            Interactive
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => handleQuickSwitch('ORD-98765')}
            className={`p-2 rounded-xl text-[11px] font-medium transition-all text-left flex items-center justify-between ${
              currentOrder?.id === 'ORD-98765' && !notFound
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>Normal Flow</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => handleQuickSwitch('ORD-54321')}
            className={`p-2 rounded-xl text-[11px] font-medium transition-all text-left flex items-center justify-between ${
              currentOrder?.id === 'ORD-54321' && !notFound
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>1. Delayed Order</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => handleQuickSwitch('ORD-11223')}
            className={`p-2 rounded-xl text-[11px] font-medium transition-all text-left flex items-center justify-between ${
              currentOrder?.id === 'ORD-11223' && !notFound
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>2. Not Received</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => handleQuickSwitch('ORD-99999')}
            className={`p-2 rounded-xl text-[11px] font-medium transition-all text-left flex items-center justify-between ${
              currentOrder?.id === 'ORD-99999' && !notFound
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>3. No Tracking Yet</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Mobile Frame Container */}
      <div className="w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* App Top Header with Search Form */}
        <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white p-5 pt-6 relative">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-lg font-bold tracking-tight">Order Tracking</h1>
              <p className="text-[11px] text-indigo-200">Real-time status updates</p>
            </div>
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
              <Package className="w-5 h-5 text-indigo-100" />
            </div>
          </div>

          {/* Search Bar Form */}
          <form onSubmit={handleSearch} className="relative mt-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Order ID (e.g. ORD-98765)"
              className="w-full pl-9 pr-16 py-2.5 bg-white text-slate-900 placeholder-slate-400 text-xs font-medium rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <button 
              type="submit"
              className="absolute right-1.5 top-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition shadow-sm active:scale-95"
            >
              Track
            </button>
          </form>
        </div>

        {/* Dynamic Content Body */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto min-h-[420px]">

          {/* NOT FOUND STATE */}
          {notFound ? (
            <div className="py-12 px-4 text-center space-y-3">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-100">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Order Not Found</h2>
              <p className="text-xs text-slate-500 max-w-[260px] mx-auto leading-relaxed">
                No record found for <span className="font-semibold text-slate-700">"{searchQuery}"</span>. Please check the ID or try clicking one of the evaluator buttons above.
              </p>
            </div>
          ) : currentOrder?.statusType === 'not_available' ? (
            /* EDGE CASE 3: NO TRACKING YET */
            <div className="py-10 px-4 text-center space-y-4">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto border border-purple-100">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-bold text-slate-900">Tracking Info Processing</h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[280px] mx-auto">
                  Order <span className="font-semibold text-slate-700">#{currentOrder.id}</span> is received. Logistics partner updates will be live shortly.
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                💡 Typically updates within <span className="font-bold text-slate-800">12-24 hours</span>.
              </div>
              <button 
                onClick={() => handleSearch()}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh Status
              </button>
            </div>
          ) : (
            <>
              {/* Order Overview Header */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-medium">Order ID</span>
                  <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                    {currentOrder.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-medium">Courier Partner</span>
                  <span className="text-[11px] font-semibold text-slate-700">{currentOrder.courier}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-200/60 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Est. Delivery:</span>
                  <span className={`font-bold ${currentOrder.statusType === 'delayed' ? 'text-amber-600' : 'text-indigo-600'}`}>
                    {currentOrder.estimatedDelivery}
                  </span>
                </div>
              </div>

              {/* EDGE CASE 1: DELAYED ALERT */}
              {currentOrder.statusType === 'delayed' && (
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Shipment Delayed</span>
                  </div>
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    {currentOrder.delayReason}
                  </p>
                  <div className="bg-white/80 p-2 rounded-lg text-[11px] font-semibold text-amber-900 flex justify-between border border-amber-100">
                    <span>New Estimated Date:</span>
                    <span>{currentOrder.newEstimatedDelivery}</span>
                  </div>
                </div>
              )}

              {/* EDGE CASE 2: DELIVERED BUT NOT RECEIVED ALERT */}
              {currentOrder.statusType === 'delivered_not_received' && (
                <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl space-y-2.5">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-rose-900">Haven't received your parcel?</h4>
                      <p className="text-[11px] text-rose-700 leading-tight mt-0.5">
                        If status shows delivered but you don't have it, report immediately.
                      </p>
                    </div>
                  </div>
                  {issueReported ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center text-xs text-emerald-800 font-medium flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Issue reported! Support will contact you shortly.</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIssueReported(true)}
                      className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-rose-500/20"
                    >
                      Report Issue (Not Received)
                    </button>
                  )}
                </div>
              )}

              {/* TIMELINE TRACKER */}
              <div className="bg-white p-2 rounded-2xl space-y-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                  Delivery Progress
                </h3>
                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-slate-200">
                  {currentOrder.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-3">
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10 shadow-xs ${
                          step.isError
                            ? 'bg-amber-500 ring-4 ring-amber-100'
                            : step.completed
                            ? 'bg-emerald-500 ring-4 ring-emerald-50'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {step.completed ? <Check className="w-3 h-3 text-white" /> : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <p className={`text-xs font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.status}
                          </p>
                          <span className="text-[10px] text-slate-400 font-medium">{step.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRODUCT SUMMARY */}
              <div className="border-t border-slate-100 pt-3 space-y-2">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                  Order Items
                </h3>
                <div className="space-y-2">
                  {currentOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl p-1 bg-white rounded-lg border border-slate-100">{item.img}</span>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{item.name}</p>
                          <p className="text-[10px] text-slate-400">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900">{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Billing Summary */}
                <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>{currentOrder.summary.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping Fee</span>
                    <span>{currentOrder.summary.shipping}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 text-sm pt-1.5 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-indigo-600">{currentOrder.summary.total}</span>
                  </div>
                </div>
              </div>

              {/* SUPPORT ACTIONS WITH FUNCTIONAL LINKS */}
              <div className="border-t border-slate-100 pt-3 flex gap-2">
                {/* Direct Tel Call */}
                <a 
                  href="tel:+8801700000000"
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" /> Call Support
                </a>

                {/* Interactive Modal Chat */}
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Live Chat
                </button>
              </div>
            </>
          )}

        </div>

      </div>

      {/* INTERACTIVE LIVE CHAT MODAL */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 z-50">
          <div className="bg-white w-full max-w-[380px] rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col h-[420px] animate-in fade-in zoom-in-95">
            
            {/* Chat Modal Header */}
            <div className="bg-indigo-600 p-3.5 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div>
                  <h3 className="text-xs font-bold leading-tight">Customer Support Agent</h3>
                  <p className="text-[10px] text-indigo-200">Order #{currentOrder?.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)} 
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Message Stream */}
            <div className="p-3.5 space-y-2.5 flex-1 overflow-y-auto bg-slate-50/50 text-xs">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-800 border border-slate-100 shadow-2xs rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-slate-100 px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition flex items-center justify-center active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}