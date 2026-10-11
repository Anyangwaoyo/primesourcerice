import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Home } from './components/Home.tsx';
import { Shop } from './components/Shop.tsx';
import { BulkOrders } from './components/BulkOrders.tsx';
import { AboutUs } from './components/AboutUs.tsx';
import { Contact } from './components/Contact.tsx';
import { Checkout } from './components/Checkout.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { Chatbot } from './components/Chatbot.tsx';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, toasts, dismissToast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#242A26] selection:bg-[#C69C48]/30 selection:text-[#174D36]">
      {/* Navigation Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <Home />}
        {currentPage === 'shop' && <Shop />}
        {currentPage === 'bulk-orders' && <BulkOrders />}
        {currentPage === 'about' && <AboutUs />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'checkout' && <Checkout />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      {/* Shopping Cart Drawer */}
      <CartDrawer />

      {/* AI Customer Support Chatbot */}
      <Chatbot />

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      {toasts.length > 0 && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto p-3.5 rounded-xl border shadow-lg flex items-center justify-between gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-150 ${
                toast.type === 'error'
                  ? 'bg-red-50 text-red-800 border-red-200'
                  : toast.type === 'info'
                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                  : 'bg-emerald-50 text-[#174D36] border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {toast.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                ) : toast.type === 'info' ? (
                  <Info className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#174D36] shrink-0" />
                )}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AppProvider>
  );
}
