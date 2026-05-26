'use client';

import { useState } from 'react';
import ConsentCheckboxes from './ConsentCheckboxes';

export default function GateAccessForm() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [nss, setNss] = useState('');
  const [semanas, setSemanas] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!privacyAccepted) {
      setError('Debes aceptar los Términos y Condiciones y el Aviso de Privacidad');
      return;
    }

    if (!nombre.trim() || !telefono.trim() || !correo.trim()) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          telefono: telefono.trim(),
          correo: correo.trim(),
          nss: nss.trim() || undefined,
          semanas_cotizadas: semanas ? parseInt(semanas) : undefined,
          privacyAccepted,
          marketingAccepted,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setNombre('');
        setTelefono('');
        setCorreo('');
        setNss('');
        setSemanas('');
        setPrivacyAccepted(false);
        setMarketingAccepted(false);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.error || 'Hubo un error al procesar tu solicitud');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          WhatsApp <span className="text-red-600">*</span>
        </label>
        <input
          type="tel"
          placeholder="+52 999 200 5550"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo electrónico <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          placeholder="tu@correo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            NSS <span className="text-xs text-gray-500">(opcional)</span>
          </label>
          <input
            type="text"
            placeholder="00000000000"
            value={nss}
            onChange={(e) => setNss(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Semanas cotizadas <span className="text-xs text-gray-500">(opcional)</span>
          </label>
          <input
            type="number"
            min="0"
            max="750"
            placeholder="500"
            value={semanas}
            onChange={(e) => setSemanas(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <ConsentCheckboxes
          privacyAccepted={privacyAccepted}
          setPrivacyAccepted={setPrivacyAccepted}
          marketingAccepted={marketingAccepted}
          setMarketingAccepted={setMarketingAccepted}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando...' : 'Recibir Acceso'}
      </button>

      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-center">
            ✓ Revisa tu correo. Te enviaremos el acceso en los próximos minutos.
          </p>
        </div>
      )}
    </form>
  );
}
