import styles from "./styles.module.scss";
import Home from "./Components/Home/home";
import Nosotros from "./Components/Nosotros/nosotros";
import Products from "./Components/Products/products";

function App() {
  return (
    <div className={styles.App}>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>Domotic Mood</h1>
        <div className={styles.divNav}>
          <ul>
            <a href="# ">HOME</a>
          </ul>
          <ul>
            <a href="# ">QUIENES SOMOS</a>
          </ul>
          <ul>
            <a href="# ">PRODUCTO</a>
          </ul>
          <ul>
            <a href="# ">AYUDA</a>
          </ul>
        </div>
      </nav>

      <Home />
      <Nosotros />
      <Products />
    </div>
  );
}

export default App;
