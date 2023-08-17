import React, {useEffect, useState} from "react";
import axios from "axios";
import {getUserID} from "../hooks/userID";
import {useCookies} from "react-cookie";
import {NavLink, useNavigate} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const userID = getUserID();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("https://virtual-bite-server.vercel.app/recipes", {
                    withCredentials: true,
                });
                setRecipes(response.data);
            } catch (e) {
                console.log(e);
            }
        };

        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(
                    `https://virtual-bite-server.vercel.app/recipes/savedRecipes/${userID}`, {
                        withCredentials: true,
                    }
                );
                setSavedRecipes(response.data.savedRecipesID);
            } catch (e) {
                console.log(e);
            }
        };
        fetchRecipes();
        if (cookies.access_token) fetchSavedRecipes();
    }, []);

    const savedRecipe = async (recipeID) => {
        if (!userID) navigate("/auth");
        try {
            const response = await axios.put(
                    "https://virtual-bite-server.vercel.app/recipes",
                    {
                        recipeID,
                        userID,
                    },
                    {
                        headers: {Authorization: cookies.access_token},
                        withCredentials: true,
                    },
                )
            ;
            setSavedRecipes(response.data.savedRecipes);
        } catch (e) {
            console.log(e);
        }
    };

    const isRecipesSaved = (id) => savedRecipes?.includes(id);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };
    useEffect(() => {
        const filteredRecipes = recipes.filter((recipe) =>
            recipe?.name?.toLowerCase().includes(search.toLowerCase()),
        );
        setFilteredRecipes(search === "" ? recipes : filteredRecipes);
    }, [search, recipes]);
    return (
        <>
            {recipes.length === 0 ? (
                <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
                    <Spinner
                        animation="border"
                        variant="primary"
                        style={{width: "4rem", height: "4rem", marginBottom: "1rem"}}
                    />
                    Please wait...
                </div>
            ) : (
                <div className="d-flex justify-content-center flex-column p-2">
                    <input
                        type="search"
                        className="form-control mx-auto mt-2"
                        id="exampleInputEmail1"
                        value={search}
                        placeholder="Search Recipe..."
                        style={{width: "100%", maxWidth: "900px"}}
                        onChange={handleSearch}
                    />
                    {filteredRecipes.length === 0 ? (
                        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
                            <h3 className="text-primary text-center mb-5">Recipe not found!!!</h3>
                            <p className="fw-bold p-0 m-0">
                                Looking for New Recipe...</p>
                            <p className="fw-bold p-0 m-0">Why not <NavLink to="/create-recipe">Create One</NavLink>
                            </p>
                        </div>
                    ) : (
                        filteredRecipes.map((recipe, index) => (
                            <div
                                key={index}
                                className="card shadow border-0 my-4 mx-auto"
                                style={{width: "100%", maxWidth: "900px"}}
                            >
                                <div className="row g-0 h-100">
                                    <div className="col-md-5 h-100">
                                        <img
                                            src={`${recipe?.imageUrl}`}
                                            className="img-fluid w-100 object-fit-cover rounded"
                                            alt="food"
                                            style={{
                                                height: "307px",
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-7 h-100 ">
                                        <div className="card-body py-2 h-100">
                                            <h6 className="card-title">
                                                Recipe Name : {recipe.name}
                                            </h6>
                                            <div className="card-text">
                                                <h6>Cooking Time : {recipe?.cookingTime} Mins</h6>
                                                <h6>Ingredients :</h6>
                                                <ul
                                                    className="d-flex column-gap-4 flex-wrap mb-2 w-100  align-items-center overflow-hidden"
                                                    style={{
                                                        height: "46px",
                                                    }}
                                                >
                                                    {recipe?.ingredients?.map((ingredient, index) => (
                                                        <li key={index}>{ingredient}</li>
                                                    ))}
                                                </ul>
                                                <h6 className="m-0">Instructions :</h6>
                                                <p
                                                    className="overflow-hidden py-1 ps-3 m-0"
                                                    style={{
                                                        height: "91px",
                                                        display: "-webkit-box",
                                                        overflow: "hidden",
                                                        textAlign: "left",
                                                        lineHeight: "1.3",
                                                        whiteSpace: "normal",
                                                        textOverflow: "ellipsis",
                                                        WebkitBoxOrient: "vertical",
                                                        WebkitLineClamp: "4",
                                                    }}
                                                >
                                                    {recipe?.instructions}
                                                </p>
                                            </div>
                                            <p className="card-text d-flex justify-content-between align-items-center my-2">
                                                <small className="text-muted ">
                          <span className="d-block d-sm-inline">
                            Last updated :
                          </span>
                                                    <span>
                            {recipe?.timeStamp
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                          </span>
                                                </small>{" "}
                                                <small className="text-muted">
                                                    <span className="d-block d-sm-inline">Author : </span>{" "}
                                                    <span>{recipe?.author}</span>
                                                </small>
                                                <button
                                                    className={`text-white align-items-end btn btn-sm btn-primary ${
                                                        isRecipesSaved(recipe._id)
                                                            ? `btn-dark`
                                                            : `btn-primary`
                                                    }`}
                                                    onClick={() => savedRecipe(recipe._id)}
                                                    disabled={isRecipesSaved(recipe._id)}
                                                >
                                                    {isRecipesSaved(recipe._id) ? `Saved` : `Save`}
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </>
    );
};

export default Home;
