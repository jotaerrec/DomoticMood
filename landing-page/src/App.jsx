import "./App.scss";
import Home from "./Components/Home/home";
import Nosotros from "./Components/Nosotros/nosotros";
import Products from "./Components/Products/products";


function App() {
  return (
    <div className='App'>
      <nav className='nav'>
        <h1 className='logo'>Domotic Mood</h1>
        <div className="divNav">
          <ul><a href="">HOME</a></ul>
          <ul><a href="">QUIENES SOMOS</a></ul>
          <ul><a href="">PRODUCTO</a></ul>
          <ul><a href="">AYUDA</a></ul>
        </div>

      </nav> 

      <Home/>      
      <Nosotros/>      
      <Products/>

    </div>
  );
}

export default App;
