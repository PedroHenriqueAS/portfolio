"use client";

import { useTranslation } from "react-i18next";

import { Droplets, Flame, Leaf, Search } from "lucide-react";
import styles from "./previews.module.css";

export default function PokedexPreview() {
  const { t } = useTranslation();
  return (
    <div className={styles.pokedexPreview}>
      <div className={styles.pokedexNav}>
        <span className={styles.pokeball} />
        <strong>Pokédex</strong>
        <span>{t("previews.pokedex.tagline")}</span>
      </div>
      <div className={styles.pokedexHeading}>
        <small>{t("previews.pokedex.eyebrow")}</small>
        <strong>
          {t("previews.pokedex.title")} <br />
          {t("previews.pokedex.titleEnd")}
        </strong>
        <span>{t("previews.pokedex.description")}</span>
      </div>
      <div className={styles.pokedexSearch}>
        <Search />
        <span>{t("previews.pokedex.placeholder")}</span>
        <b>{t("previews.pokedex.search")}</b>
      </div>
      <div className={styles.pokemonCards}>
        {[
          {
            name: "Bulbasaur",
            type: t("previews.pokedex.grass"),
            icon: Leaf,
            color: "#cbe9d8",
          },
          {
            name: "Charmander",
            type: t("previews.pokedex.fire"),
            icon: Flame,
            color: "#f6dbcb",
          },
          {
            name: "Squirtle",
            type: t("previews.pokedex.water"),
            icon: Droplets,
            color: "#cbdfea",
          },
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
