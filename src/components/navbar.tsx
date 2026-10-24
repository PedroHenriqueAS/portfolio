export default function Navbar() {
  return (
    <div>
      <nav
        aria-label="Navegação principal"
        className="flex h-12 w-full items-center justify-between px-3"
      >
          <div className="flex">
            <span className="text-2xl font-extrabold tracking-tighter">Pedrohas</span>
            <div className="h-1 w-1 bg-purple-600 mt-5.5 rounded" />
          </div>
          <div>
            <ul className="flex gap-10 text-white/50">
              <li>projetos</li>
              <li>jornada</li>
              <li>contato</li>
            </ul>
          </div>
      </nav>
      <div className="flex justify-center flex-col items-center gap-3">
            <div className="h-0.5 w-15 bg-purple-600 rounded"></div>
            <span className="text-white/45 text-md tracking-wider">PEDRO HAS / FRONT-END DEVELOPER</span>
      </div>
    </div>
  );
}
