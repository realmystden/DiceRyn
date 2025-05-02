import { PageLayout } from "@/components/page-layout"

export default function PrivacyPolicyPage() {
  return (
    <PageLayout title="Política de Privacidad">
      <div className="max-w-3xl mx-auto bg-[#121216] p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Política de Privacidad</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">1. Información que recopilamos</h2>
          <p className="mb-2">
            En DiceRyn, recopilamos información personal limitada para proporcionar y mejorar nuestros servicios. Esta
            información puede incluir:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Información de la cuenta (correo electrónico, nombre de usuario)</li>
            <li>Datos de uso y preferencias</li>
            <li>Información sobre proyectos completados</li>
            <li>Logros desbloqueados</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">2. Cómo utilizamos su información</h2>
          <p className="mb-2">Utilizamos la información recopilada para:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Proporcionar, mantener y mejorar nuestros servicios</li>
            <li>Personalizar su experiencia</li>
            <li>Comunicarnos con usted</li>
            <li>Analizar tendencias de uso</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">3. Compartición de datos</h2>
          <p>
            No vendemos ni compartimos su información personal con terceros, excepto cuando sea necesario para
            proporcionar nuestros servicios o cuando estemos legalmente obligados a hacerlo.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">4. Seguridad</h2>
          <p>
            Implementamos medidas de seguridad diseñadas para proteger su información personal, pero ningún método de
            transmisión por Internet o almacenamiento electrónico es 100% seguro.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Contacto</h2>
          <p>Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos a través de nuestro sitio web.</p>
        </section>
      </div>
    </PageLayout>
  )
}
