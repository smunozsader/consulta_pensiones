import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Consultoría</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white">Acerca de</Link></li>
              <li><Link href="/casos" className="hover:text-white">Casos de éxito</Link></li>
              <li><a href="https://wa.me/529992005550" className="hover:text-white">Contactar por WhatsApp</a></li>
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
  );
}
