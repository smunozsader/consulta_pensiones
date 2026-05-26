'use client';

import { useState } from 'react';
import { saveSubscriber } from '@/lib/firebase-service';
import { v4 as uuidv4 } from 'uuid';

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  title: string;
  description: string;
  downloadLabel?: string;
}

export default function EmailGateModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  description,
  downloadLabel = 'Descargar',
}: EmailGateModalProps) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Email inválido');
      }

      if (!nombre.trim()) {
        throw new Error('Por favor ingresa tu nombre');
      }

      // Generar token único
      const accessToken = uuidv4();

      // Guardar subscriber
      await saveSubscriber({
        nombre,
        telefono: '', // Opcional por ahora
        correo: email,
        privacyAccepted: true,
        marketingAccepted: true,
        accessToken,
      });

      // TODO: Enviar email confirmación con Resend
      // await sendConfirmationEmail(email, nombre);

      setSuccess(true);
      onSuccess(email);

      // Auto-close después de 2 segundos
      setTimeout(() => {
        setEmail('');
        setNombre('');
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error registrando email');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="p-6">
            {success ? (
              <div className="text-center py-4">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">¡Gracias!</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Tu descarga está lista. Revisa tu email para confirmación.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-600 text-sm mb-6">{description}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      🔒 Tu email está protegido. Nunca será compartido.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
                  >
                    {loading ? 'Procesando...' : downloadLabel}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Al descargar, aceptas nuestra{' '}
                    <a href="/privacidad" className="text-blue-600 hover:underline">
                      Política de Privacidad
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
