
'use client';

import { useState, useRef, useEffect } from 'react';

export default function ReceiptPrinter() {
  const [showModal, setShowModal] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);
  const [hasPrinted, setHasPrinted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [extraReceipts, setExtraReceipts] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element for printer sound
    audioRef.current = new Audio('../public/printer-sound.mp3');
  }, []);

  const handlePrint = () => {
    if (isPrinting) return;

    setIsPrinting(true);
    setIsActive(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { });
    }

    if (hasPrinted) {
      const newId = Date.now();
      setExtraReceipts(prev => [...prev, newId]);

      setTimeout(() => {
        setExtraReceipts(prev => prev.filter(id => id !== newId));
      }, 11500);
    } else {
      setHasPrinted(true);
    }

    setTimeout(() => {
      setIsPrinting(false);
      setIsActive(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }, 6500);
  };

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center bg-[#e9e9e9] overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Pacifico&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; visibility: hidden; }
          to { opacity: 1; visibility: visible; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; visibility: visible; }
          to { opacity: 0; visibility: hidden; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.4; }
        }
        
        @keyframes print {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(0); }
        }
        
        @keyframes grow {
          0% { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); }
          100% { clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0); }
        }
        
        @keyframes shrink {
          0% { clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0); }
          100% { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); }
        }
        
        @keyframes fadeOutReceipt {
          to { opacity: 0; }
        }
        
        .fade-in { animation: fadeIn 1s ease 1s forwards; }
        .fade-out { animation: fadeOut 1s ease forwards; }
        .print-animation { animation: print 6.5s linear forwards; }
        .fade-out-receipt { animation: fadeOutReceipt 5s linear forwards; }
        .indicator-blink { animation: blink 1s infinite; }
        .icon-grow::before { animation: grow 0.5s ease forwards; }
        .icon-shrink::before { animation: shrink 0.5s ease forwards; }
      `}</style>

      {/* Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-5 ${showModal ? 'fade-in' : 'fade-out'} ${!showModal && 'invisible'}`}>
        <div className="bg-white p-8 rounded-lg flex flex-col items-center gap-6 shadow-2xl" style={{ fontFamily: 'Geist Mono, monospace' }}>
          <h3 className="text-2xl font-semibold text-zinc-900">Quick Tip</h3>
          <p className="text-center leading-relaxed text-gray-800">
            Press the black button to print. <br />
            Red means ready, green means printing and temporarily disabled.
          </p>
          <button
            onClick={() => setShowModal(false)}
            className="bg-black text-white px-8 py-3 rounded font-semibold hover:bg-black/80 transition-colors"
          >
            Okay
          </button>
        </div>
      </div>

      {/* Printer */}
      <div className="relative flex flex-col items-center" style={{ width: '32.1875rem', height: '40rem' }}>
        {/* Shadow */}
        <div className="absolute -top-2.5 left-2.5 w-[33.4375rem] h-44 rounded-[3.75rem] blur-3xl -z-10 bg-gradient-to-b from-[#d7d7d7] to-[#787878cc]" />

        {/* Top Section */}
        <div className="relative z-20 w-full flex items-end justify-between rounded-[1.0625rem] bg-gradient-to-b from-[#d7d7d7] via-[#f6f6f6] to-[#d7d7d7] shadow-md p-4" style={{ height: '7.4375rem' }}>
          <p className="text-[1.25rem] text-[#eaeaea] mb-[-0.09375rem]" style={{ fontFamily: 'Pacifico, cursive', textShadow: '-0.07rem -0.07rem 0.1875rem #e1e1e14d, 0.07rem 0.07rem 0.1875rem #3838384d' }}>
            Karema Printer
          </p>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="relative flex items-center justify-center gap-0.5 rounded-full border border-[#e8e8e8] bg-gradient-to-br from-[#1a1a1a] to-black shadow-lg overflow-hidden"
            style={{ height: '1.625rem', padding: '0 0.5625rem' }}
          >
            {/* Print Icon */}
            <div className="relative flex items-center justify-center" style={{ width: '0.9375rem', height: '0.875rem' }}>
              {/* Paper line */}
              <div className={`absolute left-1/2 -top-[0.15625rem] w-[0.15625rem] h-5 rounded-sm ${isActive ? 'icon-grow bg-gradient-to-r from-black via-black to-[#1bd218]' : 'icon-shrink bg-gradient-to-r from-black via-black to-[#ff4444]'}`} style={{ transform: 'rotate(45deg) translateX(-50%)', zIndex: 3 }} />

              {/* Printer body */}
              <div className={`absolute w-[0.625rem] h-full rounded-sm transition-all duration-500 ${isActive ? 'border-[0.07rem] border-[#1bd218]' : 'border-[0.07rem] border-[#ff4444]'}`}>
                <div className="absolute bottom-0 w-full h-1 bg-black flex justify-center">
                  <div className={`absolute bottom-[0.09375rem] w-[70%] h-[0.07rem] rounded transition-all duration-500 ${isActive ? 'bg-[#1bd218]' : 'bg-[#ff4444]'}`} />
                </div>
              </div>

              {/* Printer top */}
              <div className={`absolute w-full h-[0.40625rem] rounded transition-all duration-500 ${isActive ? 'bg-[#1bd218]' : 'bg-[#ff4444]'}`}>
                <div className="absolute top-[0.09375rem] right-[0.15625rem] w-[0.1875rem] h-[0.09375rem] rounded bg-black" />
              </div>
            </div>

            {/* Indicator */}
            <div className={`w-2 h-2 rounded-full ml-[0.3125rem] indicator-blink transition-colors duration-500 ${isActive ? 'bg-[#1bd218]' : 'bg-[#ff4444]'}`} />
          </button>
        </div>

        {/* Middle trapezoid */}
        <div className="relative -mt-[0.8125rem] w-[32.125rem] h-6 bg-[#bcbcbc] -z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 99.6% 100%, 0.4% 100%)' }} />

        {/* Bottom Section */}
        <div className="relative flex justify-center w-[31.875rem]  -mt-[14px] rounded-b-xl bg-[#bcbcbc]">
          <div className="absolute bottom-[0.34375rem] w-[30.125rem] h-[0.6875rem] bg-black shadow-[0_0_0.3125rem_0.25rem_#cccccc]" style={{ borderRadius: '0.375rem 0.375rem 0.625rem 0.625rem / 0.375rem 0.375rem 0.9375rem 0.9375rem' }} />

          {/* Receipts Container */}
          <div className="absolute top-1 w-full flex justify-center overflow-hidden pb-5">
            <div className="w-[91%]">
              {/* Main Receipt */}
              <div className={`${hasPrinted ? 'print-animation' : '-translate-y-full'}`}>
                <Receipt />
              </div>

              {/* Extra Receipts */}
              {extraReceipts.map((id) => (
                <div key={id} className="print-animation fade-out-receipt">
                  <Receipt />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Receipt() {
  return (
    <div className="w-full relative" style={{ fontFamily: 'Geist Mono, monospace' }}>
      {/* Receipt Paper */}
      <div className="w-full bg-white pt-4 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#efefef]">
          <div className="flex flex-col gap-2">
            <p className="text-[1.1875rem] font-semibold text-zinc-900">Payment Successful</p>
            <p className="flex gap-4 text-[#8d8e92]">
              <span>11 May 2024</span>
              <span>08:30 PM</span>
            </p>
          </div>
          <div className="w-[3.25rem] h-[3.25rem] rounded-full bg-[#4dd278]" style={{ clipPath: 'polygon(0 0, 0 100%, 50% 100%, 38.38% 80.76%, 15.3% 55.76%, 26% 44.23%, 38.38% 56.5%, 71.07% 21.15%, 82.61% 32.69%, 38.38% 80.76%, 50% 100%, 3.4375rem 100%, 100% 0)' }} />
        </div>

        {/* Body */}
        <div className="text-[#666669]">
          <div className="flex flex-col gap-5 px-6 py-6 border-b border-[#efefef]">
            <div className="flex justify-between"><p>1x Jollof Rice & Turkey</p><p><span>$</span>3,500.00</p></div>
            <div className="flex justify-between"><p>1x Zobo Drink</p><p><span>$</span>800.00</p></div>
            <div className="flex justify-between"><p>1x Small Chops Pack</p><p><span>$</span>2,500.00</p></div>
          </div>
          <div className="flex flex-col gap-5 px-6 py-6 border-b border-[#efefef]">
            <div className="flex justify-between"><p>Subtotal</p><p><span>$</span>6,800.00</p></div>
            <div className="flex justify-between"><p>VAT (9%)</p><p><span>$</span>612.00</p></div>
            <div className="flex justify-between"><p>Service Fee</p><p><span>$</span>2,500.00</p></div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 px-6 pt-6 pb-4">
          <div className="flex justify-between text-[#666669]">
            <p>TOTAL</p>
            <p className="text-[1.1875rem] font-semibold"><span>$</span>7,450.00</p>
          </div>
          <div className="flex items-center justify-center text-lg">
            {/* <Emoji /> */}
            <span className="text-black z-10">THANK YOU</span>
          </div>
        </div>
      </div>

      {/* Cutout */}
      <div className="relative w-full -mt-[0.07rem]" style={{ filter: 'drop-shadow(0 0.75rem 0.3125rem rgba(0,0,0,0.1))' }}>
        <div className="w-full h-10 bg-white overflow-x-hidden -translate-y-8" style={{
          maskImage: 'radial-gradient(circle at 1.03125rem 2.1875rem, transparent 0.875rem, black 0.875rem)',
          maskRepeat: 'repeat-x',
          maskPosition: '-0.78125rem 0',
          maskSize: '2.0625rem 2.1875rem',
          WebkitMaskImage: 'radial-gradient(circle at 1.03125rem 2.1875rem, transparent 0.875rem, black 0.875rem)',
          WebkitMaskRepeat: 'repeat-x',
          WebkitMaskPosition: '-0.78125rem 0',
          WebkitMaskSize: '2.0625rem 2.1875rem'
        }} />
      </div>
    </div>
  );
}

function Emoji() {
  return (
    <div className="relative" style={{ width: '1.8125rem', height: '2.03125rem' }}>
      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-0.5 rounded-full blur-sm bg-[#e6e2e3]" />

      {/* Face */}
      <div className="relative w-full h-[1.8125rem] rounded-full bg-[#eccd00] border border-[#b29300] overflow-hidden" style={{ clipPath: 'circle()' }}>
        <div className="absolute bottom-0.5 w-full h-full rounded-full bg-[#fbe300]" />

        {/* Eyes */}
        <span className="absolute top-[40%] left-1/2 -translate-x-1/2 w-full flex justify-between px-1">
          <span className="relative w-[0.21875rem] h-1">
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-[0.21875rem] h-0.5 rounded-full blur-sm bg-[#f0ad22]" />
            <span className="block w-full h-full rounded-full border border-[#b29300]" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)' }} />
          </span>
          <span className="relative w-[0.21875rem] h-1">
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-[0.21875rem] h-0.5 rounded-full blur-sm bg-[#f0ad22]" />
            <span className="block w-full h-full rounded-full border border-[#b29300]" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)' }} />
          </span>
        </span>

        {/* Mouth */}
        <span className="absolute left-1/2 -translate-x-1/2 w-[0.8125rem] h-[0.8125rem]" style={{ bottom: '0.40625rem' }}>
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-2 h-0.5 rounded-full blur-lg bg-white" />
          <span className="absolute left-1/2 -translate-x-1/2 w-[95%] h-full rounded-full border border-[#b29300]" style={{ clipPath: 'polygon(0 85%, 100% 85%, 100% 100%, 0% 100%)' }} />
        </span>
      </div>
    </div>
  );
}