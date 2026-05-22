import { Award, TrendingUp, Users } from 'lucide-react';

export default function Credibility() {
  const stats = [
    {
      icon: Award,
      number: "15+",
      label: "años de experiencia",
      description: "Especialistas certificados en pensiones IMSS"
    },
    {
      icon: TrendingUp,
      number: "+$5M",
      label: "optimizados",
      description: "En recursos de pensión para nuestros clientes"
    },
    {
      icon: Users,
      number: "98%",
      label: "satisfacción",
      description: "Clientes recomiendan nuestros servicios"
    }
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#4d9de0] rounded-xl flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Number */}
                  <div>
                    <p className="text-5xl text-gray-900 mb-2">
                      {stat.number}
                    </p>
                    <p className="text-xl text-[#0066CC] mb-3">
                      {stat.label}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
