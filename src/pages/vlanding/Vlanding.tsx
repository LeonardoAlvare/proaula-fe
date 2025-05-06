import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import image from "../../assets/image.jpg";
import useAuthStore from "../../store/auth/auth.store";
import ProfileActions from "../../components/profile-actions/ProfileActions";

export default function Vlanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const userlogged = useAuthStore((state) => state.userLogged);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">
            FreelaXpress
          </a>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            {userlogged ? (
              <ProfileActions />
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/auth/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Registrar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Conectamos talento con oportunidades
              </h1>
              <p className="text-xl text-gray-600">
                FreelaXpress es la plataforma que une a freelancers talentosos
                con proyectos emocionantes. Encuentra trabajo o contrata
                profesionales de forma rápida y segura.
              </p>
            </div>

            {/* Columna derecha: imagen */}
            <div className="flex justify-center">
              <img
                src={image}
                alt="Freelancers trabajando"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                ¿Por qué elegir FreelaXprex?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestra plataforma ofrece ventajas únicas tanto para freelancers
                como para clientes
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "⏱️",
                  title: "Ahorra tiempo",
                  description:
                    "Encuentra el talento perfecto para tu proyecto en cuestión de horas, no días.",
                },
                {
                  icon: "👥",
                  title: "Comunidad global",
                  description:
                    "Accede a una red internacional de profesionales en todas las áreas.",
                },
                {
                  icon: "⚡",
                  title: "Respuesta rápida",
                  description:
                    "Recibe propuestas de calidad en minutos después de publicar tu proyecto.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4 text-3xl">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">¿Cómo funciona?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un proceso simple y eficiente para conectar talento con
                oportunidades
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "Para clientes",
                  color: "blue",
                  steps: [
                    {
                      icon: "📋",
                      title: "Publica tu proyecto",
                      description:
                        "Describe tu proyecto, establece un presupuesto y plazos de entrega.",
                    },
                    {
                      icon: "💬",
                      title: "Recibe propuestas",
                      description:
                        "Revisa las propuestas de freelancers calificados y selecciona la mejor.",
                    },
                    {
                      icon: "✅",
                      title: "Colabora y aprueba",
                      description:
                        "Trabaja con el freelancer y aprueba el proyecto cuando estés satisfecho.",
                    },
                  ],
                },
                {
                  title: "Para freelancers",
                  color: "amber",
                  steps: [
                    {
                      icon: "🔍",
                      title: "Explora proyectos",
                      description:
                        "Busca proyectos que coincidan con tus habilidades y experiencia.",
                    },
                    {
                      icon: "📝",
                      title: "Envía tu propuesta",
                      description:
                        "Presenta tu experiencia, portfolio y una oferta competitiva.",
                    },
                    {
                      icon: "✅",
                      title: "Completa el trabajo",
                      description:
                        "Entrega tu trabajo de calidad y recibe el pago una vez aprobado.",
                    },
                  ],
                },
              ].map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-8">
                  <h3
                    className={`text-2xl font-bold text-${section.color}-600`}
                  >
                    {section.title}
                  </h3>
                  {section.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start bg-white p-6 rounded-lg shadow-sm"
                    >
                      <div className="shrink-0 text-3xl">{step.icon}</div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">
                          <span
                            className={`inline-block bg-${section.color}-100 text-${section.color}-800 rounded-full w-8 h-8 text-center mr-2`}
                          >
                            {index + 1}
                          </span>
                          {step.title}
                        </h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para impulsar tu carrera freelance o encontrar el talento
              perfecto?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Únete a miles de freelancers y empresas que ya están aprovechando
              FreelaXprex para conectar y colaborar en proyectos exitosos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/register"
                className="inline-flex h-10 px-6 py-2 bg-white text-blue-600 hover:bg-gray-100 rounded-md text-sm font-medium items-center justify-center"
              >
                Registrarse gratis
              </a>
              <a
                href="/projects"
                className="inline-flex h-10 px-6 py-2 border border-white text-white hover:bg-blue-700 rounded-md text-sm font-medium items-center justify-center"
              >
                Ver proyectos
              </a>
            </div>
            <p className="mt-6 text-blue-200">
              Sin compromisos. Sin tarifas ocultas. Cancela cuando quieras.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">FreelaXprex</h3>
              <p className="mb-4">
                Tu plataforma de proyectos freelance. Conectamos talento con
                oportunidades desde 2023.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="text-xl">🐦</span>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="text-xl">📷</span>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="text-xl">🔗</span>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="text-xl">▶️</span>
                </a>
              </div>
            </div>
            {[
              {
                title: "Para Freelancers",
                links: [
                  "Cómo funciona",
                  "Encuentra proyectos",
                  "Consejos para propuestas",
                  "Aumenta tus ingresos",
                  "Comunidad",
                ],
              },
              {
                title: "Para Clientes",
                links: [
                  "Cómo funciona",
                  "Publica un proyecto",
                  "Encuentra freelancers",
                  "Guía de contratación",
                  "Éxito del proyecto",
                ],
              },
              {
                title: "Recursos",
                links: [
                  "Centro de ayuda",
                  "Blog",
                  "Guías y tutoriales",
                  "Términos de servicio",
                  "Política de privacidad",
                ],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>
              &copy; {currentYear} FreelaXprex. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
