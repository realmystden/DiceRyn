import { PageLayout } from "@/components/page-layout"

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-cinzel font-bold text-white mb-6">Política de Privacidad</h1>

        <div className="prose prose-invert prose-purple max-w-none">
          <p>Última actualización: Mayo 2025</p>

          <h2>1. Información que recopilamos</h2>
          <p>
            DiceRyn recopila información mínima necesaria para proporcionar y mejorar nuestros servicios. Esto puede
            incluir:
          </p>
          <ul>
            <li>Información de registro: correo electrónico y nombre de usuario</li>
            <li>Datos de uso: proyectos completados, logros desbloqueados</li>
            <li>Información técnica: tipo de navegador, sistema operativo</li>
          </ul>

          <h2>2. Cómo utilizamos la información</h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul>
            <li>Proporcionar, mantener y mejorar nuestros servicios</li>
            <li>Personalizar tu experiencia</li>
            <li>Comunicarnos contigo</li>
            <li>Analizar tendencias y mejorar la plataforma</li>
          </ul>

          <h2>3. Compartición de datos</h2>
          <p>
            No vendemos ni compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
          </p>
          <ul>
            <li>Con tu consentimiento</li>
            <li>Para cumplir con obligaciones legales</li>
            <li>Para proteger nuestros derechos y seguridad</li>
          </ul>

          <h2>4. Seguridad</h2>
          <p>
            Implementamos medidas de seguridad para proteger tu información personal, pero ningún método de transmisión
            por Internet es 100% seguro.
          </p>

          <h2>5. Cambios a esta política</h2>
          <p>
            Podemos actualizar nuestra Política de Privacidad periódicamente. Te notificaremos cualquier cambio
            publicando la nueva Política de Privacidad en esta página.
          </p>

          <h2>6. Contacto</h2>
          <p>Si tienes preguntas sobre esta Política de Privacidad, contáctanos en: info@rynverse.com</p>
        </div>
      </div>
    </PageLayout>
  )
}
