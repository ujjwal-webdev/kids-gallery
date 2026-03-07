'use client';

interface ModalProps { isOpen: boolean; onClose: () => void; title?: string; children: React.ReactNode; }

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6">
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        {children}
      </div>
    </div>
  );
}
