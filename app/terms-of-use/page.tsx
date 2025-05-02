import { PageLayout } from "@/components/page-layout"

export default function TermsOfUsePage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="fantasy-card p-6">
          <h1 className="text-3xl font-cinzel font-bold mb-6 text-white">Terms of Use</h1>

          <div className="prose prose-invert max-w-none font-fondamento">
            <p className="mb-4 text-gray-300">Last updated: May 2, 2024</p>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">1. Acceptance of Terms</h2>
            <p className="mb-4 text-gray-300">
              By accessing and using DiceRyn, you accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">2. Use License</h2>
            <p className="mb-4 text-gray-300">
              Permission is granted to temporarily use this website for personal, non-commercial transitory viewing
              only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">3. Disclaimer</h2>
            <p className="mb-4 text-gray-300">
              The materials on DiceRyn's website are provided on an 'as is' basis. DiceRyn makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">4. Limitations</h2>
            <p className="mb-4 text-gray-300">
              In no event shall DiceRyn or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on DiceRyn's website, even if DiceRyn or a DiceRyn authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">5. Revisions and Errata</h2>
            <p className="mb-4 text-gray-300">
              The materials appearing on DiceRyn's website could include technical, typographical, or photographic
              errors. DiceRyn does not warrant that any of the materials on its website are accurate, complete or
              current. DiceRyn may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2 className="text-2xl font-cinzel font-semibold mt-6 mb-4 text-white">6. Governing Law</h2>
            <p className="mb-4 text-gray-300">
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably
              submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
