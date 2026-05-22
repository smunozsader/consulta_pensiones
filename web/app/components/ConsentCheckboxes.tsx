'use client';

interface ConsentCheckboxesProps {
  privacyAccepted: boolean;
  setPrivacyAccepted: (accepted: boolean) => void;
  marketingAccepted: boolean;
  setMarketingAccepted: (accepted: boolean) => void;
}

export default function ConsentCheckboxes({
  privacyAccepted,
  setPrivacyAccepted,
  marketingAccepted,
  setMarketingAccepted,
}: ConsentCheckboxesProps) {
  return (
    <div className="space-y-4 mt-4">
      {/* Casilla obligatoria: Privacidad */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacidad"
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          required
          className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="privacidad" className="text-sm text-gray-700 cursor-pointer">
          Acepto los{' '}
          <a href="/terminos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Términos y Condiciones
          </a>
          {' '}y he leído el{' '}
          <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Aviso de Privacidad
          </a>
          . <span className="text-red-600 font-bold">*</span>
        </label>
      </div>

      {/* Casilla opcional: Marketing */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="marketing"
          checked={marketingAccepted}
          onChange={(e) => setMarketingAccepted(e.target.checked)}
          className="mt-1 w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
        />
        <label htmlFor="marketing" className="text-sm text-gray-700 cursor-pointer">
          Deseo recibir ofertas exclusivas, promociones y contenido educativo sobre pensiones por correo electrónico.
        </label>
      </div>

      {/* Texto informativo */}
      <p className="text-xs text-gray-500 mt-4">
        <span className="text-red-600 font-bold">*</span> Campo obligatorio. Tus datos serán protegidos conforme a la
        {' '}
        <a href="/privacidad" className="text-blue-600 hover:underline">
          Ley Federal de Protección de Datos Personales (LFPDPPP)
        </a>
      </p>
    </div>
  );
}
