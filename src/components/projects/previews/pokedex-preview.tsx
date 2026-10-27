import { Droplets, Flame, Leaf, Search } from "lucide-react";
import styles from "./previews.module.css";

export default function PokedexPreview() {
  return (
    <div className={styles.pokedexPreview}>
      <div className={styles.pokedexNav}>
        <span className={styles.pokeball} />
        <strong>Pokédex</strong>
        <span>EXPLORE. DESCUBRA. COLECIONE.</span>
      </div>
      <div className={styles.pokedexHeading}>
        <small>SEU GUIA DE DESCOBERTAS</small>
        <strong>
          Qual é o seu
          <br />
          próximo favorito?
        </strong>
        <span>Um universo inteiro para explorar.</span>
      </div>
      <div className={styles.pokedexSearch}>
        <Search />
        <span>Busque por nome ou número</span>
        <b>Buscar</b>
      </div>
      <div className={styles.pokemonCards}>
        {[
          { name: "Bulbasaur", type: "PLANTA", icon: Leaf, color: "#cbe9d8" },
          { name: "Charmander", type: "FOGO", icon: Flame, color: "#f6dbcb" },
          { name: "Squirtle", type: "ÁGUA", icon: Droplets, color: "#cbdfea" },
        ].map(({ name, type, icon: Icon, color }, index) => (
          <div key={name} style={{ background: color }}>
            <small>#{String(index + 1).padStart(3, "0")}</small>
            <Icon />
            <strong>{name}</strong>
            <span>{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
