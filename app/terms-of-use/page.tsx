import { PageLayout } from "@/components/page-layout"

export default function TermsOfUsePage() {
  return (
    <PageLayout title="Términos de Uso">
      <div className="max-w-3xl mx-auto bg-[#121216] p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Términos de Uso</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">1. Aceptación de los Términos</h2>
          <p>
            Al acceder o utilizar DiceRyn, usted acepta estar sujeto a estos Términos de Uso. Si no está de acuerdo con
            alguna parte de estos términos, no podrá acceder al servicio.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">2. Uso del Servicio</h2>
          <p className="mb-2">
            DiceRyn proporciona herramientas para generar ideas de proyectos y seguir su progreso. Usted acepta utilizar
            el servicio solo para fines legales y de acuerdo con estos términos.
          </p>
          <p>
            No debe utilizar el servicio de manera que pueda dañar, deshabilitar o sobrecargar DiceRyn o interferir con
            el uso del servicio por parte de terceros.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">3. Cuentas</h2>
          <p className="mb-2">
            Al crear una cuenta en DiceRyn, usted es responsable de mantener la seguridad de su cuenta y contraseña.
          </p>
          <p>
            Usted es responsable de todas las actividades que ocurran bajo su cuenta y acepta notificarnos
            inmediatamente sobre cualquier uso no autorizado de su cuenta.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">4. Propiedad Intelectual</h2>
          <p>
            El servicio y su contenido original, características y funcionalidad son propiedad de DiceRyn y están
            protegidos por derechos de autor, marcas registradas y otras leyes de propiedad intelectual.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">5. Limitación de Responsabilidad</h2>
          <p>
            En ningún caso DiceRyn, sus directores, empleados o agentes serán responsables de cualquier daño directo,
            indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar el servicio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Cambios en los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar o reemplazar estos términos en cualquier momento. Es su
            responsabilidad revisar estos términos periódicamente para detectar cambios.
          </p>
        </section>
      </div>
    </PageLayout>
  )
}
