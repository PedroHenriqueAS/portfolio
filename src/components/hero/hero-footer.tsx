import { MapPin, Sun, Volume2 } from "lucide-react";

export default function HeroFooter() {
  return (
    <div className="w-full h-15 mt-5 flex items-center justify-between gap-3">
      <p className="flex gap-1">
        <MapPin className="color-purple-600" /> São Paulo, SP | desde 2019
      </p>
      <div className="flex gap-3">
        <p className="border-b-1 border-purple-600">Explore o estudio</p>
        <button className="border-2 py-1 px-2 rounded-2xl flex gap-2 text-sm">
          <Sun size={18} /> Luz
        </button>
        <button className="border-2 py-1 px-2 rounded-2xl flex gap-2 text-sm">
          <Volume2 size={18} /> Som
        </button>
      </div>
    </div>
  );
}
