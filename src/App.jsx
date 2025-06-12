import Header from "./Components/Header";
import { Routes,Route } from "react-router-dom";
import Cards from "./Components/Cards";
import CardsDetail from "./Components/CardsDetail"
import CartLogger from "./Components/CartLogger";
const App=()=>{
  return (
    <>
      <Header />
      <CartLogger/>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cart" element={<CardsDetail />} />
      </Routes>
    </>
  );
}

export default App; 