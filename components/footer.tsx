import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-4 px-6 bg-[#0f0f12] border-t border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <div className="mb-2 md:mb-0">© {currentYear} DiceRyn by Rynverse</div>
        <div className="flex space-x-6">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Política de Privacidad
          </Link>
          <Link href="/terms-of-use" className="hover:text-white transition-colors">
            Términos de Uso
          </Link>
        </div>
      </div>
    </footer>
  )
}
