import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#0a0a0c] border-t border-gray-800 py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">© DiceRyn by Rynverse</div>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terms-of-use" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
