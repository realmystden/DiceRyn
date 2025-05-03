import { PageLayout } from "@/components/page-layout"

export default function TermsOfUsePage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-cinzel font-bold text-white mb-6">Términos de Uso</h1>

        <div className="prose prose-invert prose-purple max-w-none">
          <p>Última actualización: Mayo 2023</p>

          <h2>1. Aceptación de los términos</h2>
          <p>
            Al acceder y utilizar DiceRyn, aceptas estar sujeto a estos Términos de Uso. Si no estás de acuerdo con
            alguna parte de estos términos, no podrás acceder al servicio.
          </p>

          <h2>2. Cambios en los términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos cualquier
            cambio publicando los nuevos Términos de Uso en esta página.
          </p>

          <h2>3. Cuentas</h2>
          <p>
            Cuando creas una cuenta con nosotros, debes proporcionar información precisa y completa. Eres responsable de
            mantener la seguridad de tu cuenta y contraseña.
          </p>

          <h2>4. Propiedad intelectual</h2>
          <p>
            El servicio y su contenido original, características y funcionalidad son propiedad de DiceRyn y están
            protegidos por leyes internacionales de derechos de autor, marcas registradas, patentes, secretos
            comerciales y otros derechos de propiedad intelectual.
          </p>

          <h2>5. Enlaces a otros sitios web</h2>
          <p>
            Nuestro servicio puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados
            por DiceRyn. No tenemos control ni asumimos responsabilidad por el contenido, políticas de privacidad o
            prácticas de sitios web de terceros.
          </p>

          <h2>6. Terminación</h2>
          <p>
            Podemos terminar o suspender tu acceso inmediatamente, sin previo aviso ni responsabilidad, por cualquier
            motivo, incluyendo, sin limitación, si incumples los Términos de Uso.
          </p>

          <h2>7. Limitación de responsabilidad</h2>
          <p>
            En ningún caso DiceRyn, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán
            responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo.
          </p>

          <h2>8. Ley aplicable</h2>
          <p>
            Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus
            disposiciones sobre conflictos de leyes.
          </p>

          <h2>9. Contacto</h2>
          <p>Si tienes preguntas sobre estos Términos, contáctanos en: info@rynverse.com</p>
        </div>
      </div>
    </PageLayout>
  )
}
