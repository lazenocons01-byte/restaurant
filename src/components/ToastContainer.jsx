import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'error':
        return <AlertCircle size={20} style={{ color: '#fff', flexShrink: 0 }} />;
      case 'info':
        return <Info size={20} style={{ color: '#fff', flexShrink: 0 }} />;
      case 'success':
      default:
        return <CheckCircle2 size={20} style={{ color: '#fff', flexShrink: 0 }} />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'error':
        return '#ef4444';
      case 'info':
        return '#3b82f6';
      case 'success':
      default:
        return '#10b981';
    }
  };

  return (
    <div
      id="toast-container"
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            background: getBackgroundColor(toast.type),
            color: '#fff',
            padding: '12px 18px',
            borderRadius: 10,
            fontSize: '0.9rem',
            fontWeight: 500,
            boxShadow: '0 10px 30px rgba(0,0,0,0.22)',
            minWidth: 280,
            maxWidth: 380,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            pointerEvents: 'all',
            animation: 'slideInRight 0.35s ease',
          }}
        >
          {getIcon(toast.type)}
          <span style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</span>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              padding: 2,
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

