'use client';

import { useState } from 'react';
import SecurityBadge from './SecurityBadge';

interface ActuarialFormData {
  nombre: string;
  email: string;
  telefono: string;
  curp: string;
  nss: string;
  edadActual: number;
  semanasActuales: number;
  salarioDiarioPromedio: number;
  tieneEstadoCuenta: boolean;
  documentacionCompleta: boolean;
  historialPatrones: string;
  notas: string;
}

interface ActuarialAnalysisFormProps {
  onSubmit: (data: ActuarialFormData) => void;
  loading: boolean;
}

export default function ActuarialAnalysisForm({ onSubmit, loading }: ActuarialAnalysisFormProps) {
  const [formData, setFormData] = useState<ActuarialFormData>({
    nombre: '',
    email: '',
    telefono: '',
    curp: '',
    nss: '',
    edadActual: 62,
    semanasActuales: 500,
    salarioDiarioPromedio: 400,
    tieneEstadoCuenta: false,
    documentacionCompleta: false,
    historialPatrones: '',
    notas: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim() || formData.nombre.length < 2) {
      newErrors.nombre = 'Nombre requerido (mínimo 2 caracteres)';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefono || formData.telefono.replace(/\D/g, '').length < 10) {
      newErrors.telefono = 'Teléfono inválido';
    }

    if (!formData.curp || formData.curp.length !== 18) {
      newErrors.curp = 'CURP debe tener 18 caracteres';
    }

    if (!formData.nss || formData.nss.length < 10) {
      newErrors.nss = 'NSS requerido (mínimo 10 dígitos)';
    }

    if (formData.edadActual < 60) {
      newErrors.edadActual = 'Debes tener al menos 60 años';
    }

    if (formData.semanasActuales < 500) {
      newErrors.semanasActuales = 'Necesitas mínimo 500 semanas cotizadas';
    }

    if (formData.salarioDiarioPromedio <= 0) {
      newErrors.salarioDiarioPromedio = 'Salario diario debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? parseFloat(value) || 0
            : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      ...formData,
      curp: formData.curp.toUpperCase(),
      nss: formData.nss.toUpperCase(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Security Badge */}
      <div className="mb-6">
        <SecurityBadge size="small" variant="block" />
      </div>

      {/* Personal Information Section */}
      <div className="space-y-4 bg-gray-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Información Personal</h3>

        {/* Nombre */}
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">
            Nombre Completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className={`w-full px-4 py-3 rounded-lg bg-white border ${
              errors.nombre ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
            className={`w-full px-4 py-3 rounded-lg bg-white border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          <p className="text-gray-500 text-xs mt-1">🔒 No será compartido. Para confirmación de tu análisis.</p>
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
            className={`w-full px-4 py-3 rounded-lg bg-white border ${
              errors.telefono ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
          <p className="text-gray-500 text-xs mt-1">📱 Para contactarte sobre tu análisis.</p>
        </div>
      </div>

      {/* IMSS/Identificación Section */}
      <div className="space-y-4 bg-gray-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Datos del IMSS</h3>

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
            className={`w-full px-4 py-3 rounded-lg bg-white border ${
              errors.curp ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.curp && <p className="text-red-500 text-sm mt-1">{errors.curp}</p>}
          <p className="text-gray-500 text-xs mt-1">🔐 Protegido bajo LFPDPPP. Solo para validación.</p>
        </div>

        {/* NSS */}
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">
            Número de Seguridad Social (NSS) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nss"
            value={formData.nss}
            onChange={handleChange}
            placeholder="00000000000"
            className={`w-full px-4 py-3 rounded-lg bg-white border ${
              errors.nss ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.nss && <p className="text-red-500 text-sm mt-1">{errors.nss}</p>}
          <p className="text-gray-500 text-xs mt-1">📋 De tu estado de cuenta IMSS o documentos de cotización.</p>
        </div>

        {/* Edad Actual */}
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">
            Edad Actual <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              name="edadActual"
              min="60"
              max="80"
              value={formData.edadActual}
              onChange={handleChange}
              className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              name="edadActual"
              value={formData.edadActual}
              onChange={handleChange}
              min="60"
              max="80"
              className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center"
            />
          </div>
          {errors.edadActual && <p className="text-red-500 text-sm mt-1">{errors.edadActual}</p>}
        </div>
      </div>

      {/* Cotización Section */}
      <div className="space-y-4 bg-gray-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Tu Situación de Cotización</h3>

        {/* Semanas */}
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">
            Semanas Cotizadas <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              name="semanasActuales"
              min="500"
              max="900"
              step="10"
              value={formData.semanasActuales}
              onChange={handleChange}
              className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              name="semanasActuales"
              value={formData.semanasActuales}
              onChange={handleChange}
              min="500"
              max="900"
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
            />
          </div>
          {errors.semanasActuales && (
            <p className="text-red-500 text-sm mt-1">{errors.semanasActuales}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            {formData.semanasActuales >= 500 ? '✓ Cumples requisito' : '❌ Bajo mínimo'}
          </p>
        </div>

        {/* Salario Diario Promedio */}
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">
            Salario Diario Promedio (SDP) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-600">$</span>
            <input
              type="number"
              name="salarioDiarioPromedio"
              value={formData.salarioDiarioPromedio}
              onChange={handleChange}
              placeholder="400.00"
              step="10"
              min="0"
              className={`w-full pl-8 pr-4 py-3 rounded-lg bg-white border ${
                errors.salarioDiarioPromedio ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          {errors.salarioDiarioPromedio && (
            <p className="text-red-500 text-sm mt-1">{errors.salarioDiarioPromedio}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">📊 De tu estado de cuenta IMSS. Promedio de últimos años de trabajo.</p>
        </div>

        {/* ¿Tienes Estado de Cuenta? */}
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
            Ya tengo estado de cuenta actualizado del IMSS
          </label>
        </div>

        {/* Documentación */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="documentacionCompleta"
            name="documentacionCompleta"
            checked={formData.documentacionCompleta}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="documentacionCompleta" className="ml-2 text-sm text-gray-600">
            Tengo documentación completa (acta de nacimiento, RFC, CURP, comprobante domicilio)
          </label>
        </div>
      </div>

      {/* Historial */}
      <div className="space-y-4 bg-gray-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Historial Laboral</h3>

        {/* Historial de Patrones */}
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">
            Historial de Patrones/Empleadores
          </label>
          <textarea
            name="historialPatrones"
            value={formData.historialPatrones}
            onChange={handleChange}
            placeholder="Ej: Empresa X (2000-2010), Autónomo (2010-2015), Empresa Y (2015-2023)"
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-gray-500 text-xs mt-1">📝 Employers, fechas aproximadas, situación laboral (empleado/independiente).</p>
        </div>

        {/* Notas */}
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-2">Notas Adicionales</label>
          <textarea
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            placeholder="Cualquier detalle adicional que debas saber (lagunas, cambios de estado laboral, etc.)"
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-gray-700 text-sm">
          <strong>💡 Nota importante:</strong> Este análisis está basado en normativa IMSS 2026 vigente.
          Usaremos la información que proporciones para calcular tus opciones y recomendaciones.
          El análisis incluye asesoría profesional sobre tu mejor estrategia.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {loading ? 'Generando tu análisis actuarial...' : 'Proceder con Análisis Actuarial - $4,990 MXN'}
      </button>

      {/* Privacy Footer */}
      <p className="text-center text-xs text-gray-500">
        Tus datos están protegidos bajo LFPDPPP. Leer nuestra{' '}
        <a href="/privacidad" className="text-blue-600 hover:underline">
          Política de Privacidad
        </a>
      </p>
    </form>
  );
}
