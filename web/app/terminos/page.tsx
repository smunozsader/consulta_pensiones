'use client';

import Link from 'next/link';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Consultoría de Pensiones
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Términos y Condiciones de Servicios</h1>
        <p className="text-gray-600 mb-8 text-sm italic">Consultoría Integral de Pensiones</p>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bienvenida</h2>
            <p>
              Bienvenido a <strong>Consultoría Integral de Pensiones</strong> (en adelante, "la Consultoría"),
              operada por Sergio Muñoz con domicilio en Mérida, Yucatán, México (en adelante, "el Consultor").
            </p>
            <p className="mt-4">
              El presente documento establece los términos y condiciones bajo los cuales se prestan servicios
              de asesoría educativa y análisis sobre pensiones mexicanas. Al aceptar estos términos,
              usted (en adelante, "el Cliente") acepta de manera expresa la totalidad de las cláusulas aquí descritas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Naturaleza de los Servicios</h2>
            <p>
              Consultoría Integral de Pensiones ofrece servicios educativos y de asesoría especializada sobre
              normativa de pensiones mexicanas (Ley 73, Ley 97, IMSS, ISSSTE, modalidades de cotización).
            </p>
            <p className="mt-4">
              <strong>Los servicios incluyen:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Análisis de estado de cuenta IMSS</li>
              <li>Evaluación de elegibilidad para pensión</li>
              <li>Proyecciones de pensión bajo diferentes estrategias</li>
              <li>Asesoría personalizada sobre opciones de jubilación</li>
              <li>Contenido educativo (blog, documentos, guías)</li>
            </ul>
            <p className="text-sm bg-yellow-50 p-4 rounded border-l-4 border-yellow-600 mt-4">
              <strong>⚠️ Importante:</strong> Estos servicios son de naturaleza <strong>educativa y asesora</strong>, NO constituyen
              asesoría legal, contable o financiera oficial. El Consultor es especialista en normativa de pensiones, no abogado ni contador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descargo de Responsabilidad Legal</h2>
            <p>
              <strong>El Cliente reconoce y acepta que:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                Los análisis y proyecciones son estimaciones basadas en normativa vigente y NO son garantías
                de pensión del IMSS ni de ninguna institución
              </li>
              <li>
                La información puede cambiar por reformas legislativas, cambios en UMA, políticas del IMSS
                o decisiones de autoridades competentes
              </li>
              <li>
                El resultado final de cualquier trámite ante IMSS depende exclusivamente de la evaluación
                y decisión de esa institución
              </li>
              <li>
                La acreditación de períodos laborales sin documentación NO está garantizada y requiere
                validación legal por el IMSS
              </li>
              <li>
                El Cliente es responsable de validar toda información con el IMSS antes de tomar decisiones
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Limitaciones de Responsabilidad</h2>
            <p>
              El Consultor y la Consultoría NO serán responsables por:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Errores de cálculo o proyecciones de pensión</li>
              <li>Cambios en normativa no reflejados en la asesoría</li>
              <li>Decisiones del Cliente basadas únicamente en la información proporcionada</li>
              <li>Rechazos de IMSS en procesos de acreditación de períodos</li>
              <li>Cambios en UMA, tasas, políticas de pensión o decisiones administrativas</li>
              <li>Pérdida de oportunidades o daños por inactividad del Cliente</li>
              <li>Terceros que utilicen información proporcionada sin consentimiento</li>
            </ul>
            <p className="mt-4 text-sm bg-red-50 p-4 rounded border-l-4 border-red-600">
              <strong>El Consultor no es responsable civil, administrativo ni penalmente por las consecuencias
              de decisiones tomadas por el Cliente o su representante legal basadas en esta asesoría.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Confidencialidad y Datos Personales</h2>
            <p>
              El Cliente reconoce que proporcionará información sensible (historia laboral, datos financieros,
              estado de cuenta IMSS, etc.). El Consultor se compromete a:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Mantener confidencialidad absoluta de todos los datos proporcionados</li>
              <li>Usar la información <strong>exclusivamente</strong> para los fines de la asesoría</li>
              <li>No compartir datos personales con terceros sin consentimiento expreso escrito</li>
              <li>Cumplir con la Ley Federal de Protección de Datos Personales (LFPDPPP)</li>
              <li>Eliminar datos del Cliente si así lo solicita</li>
            </ul>
            <p className="mt-4">
              Para detalles completos sobre tratamiento de datos, consulta nuestro
              <Link href="/privacidad" className="text-blue-600 hover:underline">
                {' '}Aviso de Privacidad Integral
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Propiedad Intelectual</h2>
            <p>
              Todos los contenidos de la plataforma (documentos, guías, calculadora, análisis, reportes personalizados,
              metodologías) son propiedad intelectual de Consultoría Integral de Pensiones y están protegidos
              por las leyes mexicanas de propiedad industrial.
            </p>
            <p className="mt-4">
              El Cliente tiene derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Descargar y utilizar contenido educativo para uso personal</li>
              <li>Utilizar análisis personalizados recibidos como parte de la asesoría para sus trámites ante IMSS</li>
            </ul>
            <p className="mt-4">
              El Cliente <strong>NO</strong> puede:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Reproducir, distribuir o vender contenido de la Consultoría</li>
              <li>Utilizar análisis personalizados para asesorar a terceros</li>
              <li>Modificar o adaptar documentos sin permiso</li>
              <li>Revelar metodologías o secretos comerciales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Servicios Pagos y Políticas de Pago</h2>
            <p>
              <strong>Servicios y Precios (indicativos, sujetos a cambio):</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-sm">
              <li><strong>Análisis Inicial:</strong> Revisión de estado de cuenta, evaluación básica de opciones</li>
              <li><strong>Estrategia Completa:</strong> Análisis exhaustivo, proyecciones detalladas, recomendación personalizada</li>
              <li><strong>Acompañamiento Integral:</strong> Análisis, gestión de trámites, seguimiento hasta jubilación</li>
            </ul>
            <p className="mt-4">
              <strong>Métodos de Pago:</strong> Se aceptan transferencias bancarias (SPEI), pagos por WhatsApp Pay
              o métodos según disponibilidad acordada con el Consultor.
            </p>
            <p className="mt-4">
              <strong>Precios Específicos:</strong> Serán cotizados en conversación privada por WhatsApp
              después de una evaluación inicial del caso. Los precios son indicativos y pueden variar según
              complejidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cancelaciones y Reembolsos</h2>
            <p>
              <strong>Guía Gratuita:</strong> No aplica reembolsos (es contenido digital entregado).
            </p>
            <p className="mt-4">
              <strong>Servicios Pagos:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Antes de iniciar:</strong> Reembolso total si el Cliente cancela antes de que el Consultor
                comience el trabajo
              </li>
              <li>
                <strong>Trabajo en progreso (25-75%):</strong> Reembolso proporcional al trabajo NO realizado
              </li>
              <li>
                <strong>Trabajo completado (100%):</strong> No hay reembolso; el Cliente recibe los análisis y documentos
              </li>
            </ul>
            <p className="mt-4 text-sm">
              Para cancelar, el Cliente debe enviar solicitud por escrito a mi.consultor.pensiones@gmail.com
              con los detalles de la solicitud de reembolso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contenido Educativo (Blog y Documentos)</h2>
            <p>
              Todo el contenido educativo (artículos del blog, documentos PDF, guías) es de carácter informativo
              y educativo ÚNICAMENTE.
            </p>
            <p className="mt-4">
              El Cliente reconoce que:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Debe validar información con el IMSS antes de actuar</li>
              <li>Los casos prácticos son ilustrativos, no representan su situación específica</li>
              <li>Normativa puede cambiar; el contenido se actualiza periódicamente pero puede tener retrasos</li>
              <li>Debe consultar con profesionales certificados para asesoría definitiva</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modificación de Servicios y Términos</h2>
            <p>
              El Consultor se reserva el derecho de:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Modificar precios, servicios o términos en cualquier momento</li>
              <li>Suspender servicios por causas justificadas (problemas de salud, fuerza mayor, etc.)</li>
              <li>Actualizar estos términos y condiciones; cambios significativos serán notificados</li>
            </ul>
            <p className="mt-4">
              El uso continuado de servicios implica aceptación de cambios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Jurisdicción y Legislación Aplicable</h2>
            <p>
              Estos Términos y Condiciones se rigen por las leyes federales de los Estados Unidos Mexicanos.
              Las partes se someten a la jurisdicción de los tribunales competentes de Yucatán, México.
            </p>
            <p className="mt-4">
              Cualquier controversia será resuelta conforme a las leyes mexicanas, sin prejuicio del derecho
              del Cliente de acudir a las autoridades competentes (Profeco, Procuraduría, etc.) si considera
              que sus derechos han sido vulnerados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contacto y Aclaraciones</h2>
            <p>
              Si tienes preguntas sobre estos términos, contacta:
            </p>
            <div className="bg-gray-50 p-4 rounded mt-4 text-sm">
              <p><strong>Email:</strong> mi.consultor.pensiones@gmail.com</p>
              <p><strong>WhatsApp:</strong> +52 999 200 5550</p>
              <p><strong>Domicilio:</strong> Mérida, Yucatán, México</p>
            </div>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mt-8">
            <p className="text-sm font-semibold text-yellow-900">
              Última actualización: Mayo 22, 2026
              <br/>
              Vigencia: A partir de hoy. Aceptación implícita al usar servicios o hacer clic en "Aceptar".
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Consultoría</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">Acerca de</Link></li>
                <li><Link href="/casos" className="hover:text-white">Casos de éxito</Link></li>
                <li><a href="https://wa.me/529992005550" className="hover:text-white">Agendar consulta</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><a href="#form" className="hover:text-white">Descargar guía</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/privacidad" className="hover:text-white">Privacidad</Link></li>
                <li><Link href="/terminos" className="hover:text-white">Términos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: mi.consultor.pensiones@gmail.com</li>
                <li>WhatsApp: +52 999 200 5550</li>
                <li>Mérida, Yucatán</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Consultoría Integral de Pensiones. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
