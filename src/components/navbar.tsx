import AnimatedLogo from "@/components/animated-logo";

export default function Navbar() {
  return (
    <div>
      <div className="h-12">
        <nav
          aria-label="Navegação principal"
          className="fixed inset-x-0 top-0 z-50 mx-auto flex h-12 w-full max-w-[1440px] items-center justify-between px-3"
        >
          <div className="flex">
            <AnimatedLogo />
            <div className="h-1 w-1 bg-purple-600 mt-5.5 rounded" />
          </div>
          <div>
            <ul className="flex gap-10 text-white/50">
              <li>projetos</li>
              <li>
                <a href="#jornada" className="transition-colors hover:text-purple-300 focus-visible:text-purple-300">jornada</a>
              </li>
              <li>contato</li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="flex justify-center flex-col items-center gap-3">
            <div className="h-0.5 w-15 bg-purple-600 rounded"></div>
            <span className="text-white/45 text-md tracking-wider">PEDRO HAS / FRONT-END DEVELOPER</span>
      </div>
    </div>
  );
}
