const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-3">
      <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Chappi Admin. Todos los derechos reservados.
        </p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <span className="hover:text-blue-600 cursor-pointer">
            Ayuda
          </span>
          <span className="hover:text-blue-600 cursor-pointer">
            Soporte
          </span>
          <span className="hover:text-blue-600 cursor-pointer">
            Términos xD
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
