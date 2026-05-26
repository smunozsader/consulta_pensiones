'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SecurityBadge from './SecurityBadge';

interface ServiceRequestFormProps {
  serviceName: string;
  onSubmit: (data: any) => void;
  loading: boolean;
}

export default function ServiceRequestForm({
  serviceName,
  onSubmit,
  loading,
}: ServiceRequestFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    curp: '',
    nss: '',
    tieneEstadoCuenta: false,
    edadActual: '',
    salarioDiario: '',
    authorizesRepresentation: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceName,
    }));
  }, [serviceName]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim() || formData.nombre.length < 2) {
      newErrors.nombre = 'Nombre is required (at least 2 characters)';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.telefono || formData.telefono.replace(/\D/g, '').length < 10) {
      newErrors.telefono = 'Invalid phone number';
    }

    if (!formData.curp || formData.curp.length !== 18) {
      newErrors.curp = 'CURP must be 18 characters';
    }

    if (!formData.authorizesRepresentation) {
      newErrors.authorizesRepresentation = 'You must authorize representation';
    }

    if (serviceName === 'modalidad-40' && !formData.nss) {
      newErrors.nss = 'NSS is required for Modalidad 40';
    }

    if (serviceName === 'solicitud-pension' && !formData.edadActual) {
      newErrors.edadActual = 'Age is required for pension request';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      serviceName,
      ...formData,
      curp: formData.curp.toUpperCase(),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Security Badge */}
      <div className="mb-6">
        <SecurityBadge size="small" variant="block" />
      </div>

      {/* Nombre */}
      <div>
        <label className="block text-gray-900 text-sm font-semibold mb-2">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
          className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
            errors.nombre ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-900 text-sm font-semibold mb-2">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@correo.com"
          className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        <p className="text-gray-500 text-xs mt-1">🔒 No será compartido. Usamos Resend para confirmaciones seguras.</p>
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-gray-900 text-sm font-semibold mb-2">
          WhatsApp <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="+52 999 200 5550"
          className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
            errors.telefono ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
        <p className="text-gray-500 text-xs mt-1">📱 Solo para contactarte sobre tu solicitud.</p>
      </div>

      {/* CURP */}
      <div>
        <label className="block text-gray-900 text-sm font-semibold mb-2">
          CURP <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="curp"
          value={formData.curp}
          onChange={handleChange}
          placeholder="XXXXXXXXXXXXXXXX00"
          maxLength={18}
          className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
            errors.curp ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {errors.curp && <p className="text-red-500 text-sm mt-1">{errors.curp}</p>}
        <p className="text-gray-500 text-xs mt-1">🔐 Protegido bajo LFPDPPP. Nunca será compartido sin autorización.</p>
      </div>

      {/* NSS - Conditional */}
      {(serviceName === 'modalidad-40' || serviceName === 'solicitud-pension') && (
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">
            NSS {serviceName === 'modalidad-40' && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            name="nss"
            value={formData.nss}
            onChange={handleChange}
            placeholder="00000000000"
            className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
              errors.nss ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.nss && <p className="text-red-500 text-sm mt-1">{errors.nss}</p>}
        </div>
      )}

      {/* Edad Actual - Conditional */}
      {serviceName === 'solicitud-pension' && (
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">
            Edad actual <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="edadActual"
            value={formData.edadActual}
            onChange={handleChange}
            placeholder="60"
            min="55"
            max="100"
            className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
              errors.edadActual ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.edadActual && <p className="text-red-500 text-sm mt-1">{errors.edadActual}</p>}
        </div>
      )}

      {/* Salario Diario - Conditional */}
      {serviceName === 'modalidad-40' && (
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">
            Salario diario promedio (aproximado)
          </label>
          <input
            type="number"
            name="salarioDiario"
            value={formData.salarioDiario}
            onChange={handleChange}
            placeholder="400.00"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {/* ¿Tienes estado de cuenta? */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="tieneEstadoCuenta"
          name="tieneEstadoCuenta"
          checked={formData.tieneEstadoCuenta}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="tieneEstadoCuenta" className="ml-2 text-sm text-gray-600">
          Ya tengo un estado de cuenta de IMSS/ISSSTE
        </label>
      </div>

      {/* Authorization */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            name="authorizesRepresentation"
            checked={formData.authorizesRepresentation}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
          />
          <span className="ml-3 text-sm text-gray-600">
            Autorizo a Sergio Muñoz de Alba Medrano para tramitar mis solicitudes ante IMSS e ISSSTE
            en mi nombre. <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.authorizesRepresentation && (
          <p className="text-red-500 text-sm mt-2">{errors.authorizesRepresentation}</p>
        )}
      </div>

      {/* Submit Button - will be replaced by Stripe form in modal */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Procesando...' : 'Continuar con el Pago'}
      </button>

      {/* Privacy Link */}
      <p className="text-center text-xs text-gray-500">
        Tus datos están protegidos. Leer nuestra <Link href="/privacidad" className="text-blue-600 hover:underline">Política de Privacidad</Link>
      </p>
    </form>
  );
}
