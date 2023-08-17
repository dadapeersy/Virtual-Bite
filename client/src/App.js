import {Routes, Route} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipe from "./pages/SavedRecipe";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <>
            <NavBar/>
            <main style={{minHeight: "calc(max( 90vh,600px))"}}>
                <Routes>
                    <Route path="/"
                           element={<Home/>}/>
                    <Route path="/auth"
                           element={<Auth/>}/>
                    <Route path="/create-recipe"
                           element={<CreateRecipe/>}/>
                    <Route path="/saved-recipe"
                           element={<SavedRecipe/>}/>
                    <Route path="/profile"
                           element={<Profile/>}/>
                    <Route path="*"
                           element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;
