import { ShoppingBag } from "lucide-react";
import styles from "./previews.module.css";

function Shirt({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 260 260" fill="none" aria-hidden="true">
      <path
        d="M82 20 42 38 9 91 48 113 63 91 58 238H202L197 91 212 113 251 91 218 38 178 20Q130 42 82 20Z"
        fill={light ? "#d4d1d2" : "#19191f"}
        stroke={light ? "#a6a1a9" : "#414048"}
        strokeWidth="2"
      />
      <path
        d="M82 20Q130 65 178 20M88 22Q130 54 172 22M63 91 77 58M197 91 183 58M65 229H195"
        stroke={light ? "#b1acb7" : "#3c3a45"}
        strokeWidth="3"
      />
      <circle cx="130" cy="117" r="38" fill="#bd2439" />
      <path
        d="M95 134 131 80 121 112 163 101 121 157 132 124Z"
        fill="#141218"
      />
      <text
        x="130"
        y="189"
        textAnchor="middle"
        fill="#c92c3e"
        fontSize="25"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
      >
        東京
      </text>
      <text
        x="130"
        y="206"
        textAnchor="middle"
        fill={light ? "#302c37" : "#d8d3dd"}
        fontSize="7"
        letterSpacing="4"
        fontFamily="monospace"
      >
        FORMLAB
      </text>
    </svg>
  );
}

export default function StorePreview() {
  return (
    <div className={styles.storePreview}>
      <div className={styles.storeNav}>
        <strong>
          FormLab<span>●</span>
        </strong>
        <span>Início　 Loja　 Coleções　 Sobre</span>
        <ShoppingBag />
      </div>
      <div className={styles.storeHero}>
        <div className={styles.storeCopy}>
          <small>STREETWEAR / CULTURA / EXPRESSÃO</small>
          <strong>
            VISTA
            <br />O QUE
            <br />
            TE MOVE.
          </strong>
          <span>着る理由</span>
          <p>
            Roupas que conectam
            <br />
            estilo, cultura e propósito.
          </p>
          <b>Ver coleção ↗</b>
        </div>
        <div className={styles.whiteShirt}>
          <Shirt light />
        </div>
        <div className={styles.blackShirt}>
          <Shirt />
        </div>
        <span className={styles.storeEdition}>NEW DROP / 2026</span>
      </div>
      <div className={styles.storeProducts}>
        <strong>
          Novidades <span>Ver todos →</span>
        </strong>
        <div>
          {[
            "Camiseta Tokyo",
            "Camiseta Fuji",
            "Camiseta Kuro",
            "Camiseta Sakura",
          ].map((name, i) => (
            <div key={name}>
              <Shirt light={i % 2 === 1} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
