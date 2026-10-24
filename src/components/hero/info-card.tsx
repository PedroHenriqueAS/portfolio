import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/button";

export default function InfoCard() {
    return (
        <div className="h-120 w-70 flex flex-col justify-end">
            <h3 className="flex">HAS <ChevronLeft />-<ChevronRight /> DEV</h3>
            <p className="text-xl font-bold mt-5">Sou Pedro Andrade,<br/> transformo ideias em<br /> interfaces sólidas e <br />atenção aos detalhes.</p>
            <Button>Explorar Projetos</Button>
            <p className="border-b-1 border-purple-600 max-w-31 pb-1">Vamos conversar</p>
        </div>
    )
}