import "@fontsource-variable/fraunces";
import mark from "./assets/bookgraph-mark.svg";
import "./bookgraph-brand.css";

export function BookGraphBrand() {
  return <span className="bookgraph-brand"><img src={mark} width={32} height={28} alt="" aria-hidden="true" /><span>BookGraph</span></span>;
}
