import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header/>
    <div className="container">
      <h1>Welcome</h1>
      <div style={{textAlign: "center"}}>
        <button className="add" onClick={() => navigate("/plants")}>Plants</button>
        <button className="add" onClick={() => navigate("/departments")}>Departments</button>
      </div>
    </div>
    </>
  );
}

export default Home;
