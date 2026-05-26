'use client';

import { Calculator, FileText, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#003d7a] via-[#0066CC] to-[#4d9de0] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl tracking-tight leading-tight">
                ¿Cuánto recibirás de pensión?
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 max-w-xl">
                Análisis profesional en 10 minutos
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/calculadora"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00CC66] hover:bg-[#00b359] text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Calculator className="w-5 h-5" />
                Usar Calculadora
              </Link>

              <a
                href="#form"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0066CC] hover:bg-[#0052a3] text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FileText className="w-5 h-5" />
                Obtén Guía
              </a>

              <a
                href="https://wa.me/529992005550"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-lg transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/flagged/photo-1559733404-9b79677fc959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMGZpbmFuY2UlMjBkYXRhJTIwYW5hbHl0aWNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3OTM5Mzg0MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Análisis profesional de pensiones IMSS"
                className="w-full h-auto object-cover"
              />
              {/* Overlay with glass effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            </div>

            {/* Floating stats decoration */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00CC66] rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimación precisa</p>
                  <p className="text-xl text-gray-900 font-semibold">+98% exactitud</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
