import React, {useEffect, useState} from "react";
import axios from "axios";
import {getUserID} from "../hooks/userID";
import {useNavigate} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const SavedRecipe = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loader, setLoader] = useState(false);
    const userID = getUserID();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userID) navigate("/auth");

        const fetchSavedRecipes = async () => {
            setLoader(true)
            try {
                const response = await axios.get(
                    `https://virtual-bite-server.vercel.app/recipes/savedRecipes/${userID}`, {
                        withCredentials: true,
                    }
                );
                setLoader(false)
                setSavedRecipes(response.data.savedRecipes);
            } catch (e) {
                console.log(e);
            }
        };
        fetchSavedRecipes();
    }, [userID]);

    const removeRecipe = async (recipeID) => {
        try {
            const response = await axios.put(
                "https://virtual-bite-server.vercel.app/recipes/removeSavedRecipe",
                {
                    recipeID,
                    userID,
                }, {
                    withCredentials: true,
                }
            );
            setSavedRecipes(prevState =>
                prevState.filter(savedRecipe => savedRecipe._id !== recipeID)
            );
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {loader ? (
                <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
                    <Spinner
                        animation="border"
                        variant="primary"
                        style={{width: "4rem", height: "4rem", marginBottom: "1rem"}}
                    />
                    Please wait...
                </div>
            ) : (
                savedRecipes.length === 0 ? (
                    <div className="text-center mt-3">
                        <h1 className="p-2 text-muted">No saved Recipes !!</h1>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center flex-column p-2">
                        {savedRecipes?.map((recipe, index) => (
                                <div
                                    key={index}
                                    className="card shadow border-0 my-4 mx-auto"
                                    style={{width: "100%", maxWidth: "900px"}}
                                >
                                    <div className="row g-0 h-100">
                                        <div className="col-md-5 h-100">
                                            <img
                                                src={`${recipe.imageUrl}`}
                                                className="img-fluid w-100 object-fit-cover rounded"
                                                alt="food"
                                                style={{
                                                    height: "307px",
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-7 h-100">
                                            <div className="card-body py-2 h-100">
                                                <h6 className="card-title">Recipe Name : {recipe?.name}</h6>
                                                <div className="card-text">
                                                    <h6>Cooking Time : {recipe?.cookingTime} Min</h6>
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
                                                    <small className="text-muted">
                        <span className="d-block d-sm-inline">
                          Last updated :
                        </span>
                                                        <span>
                          {recipe?.timeStamp
                              ?.slice(0, 10)
                              ?.split("-")
                              ?.reverse()
                              ?.join("-")}
                        </span>
                                                    </small>{" "}
                                                    <small className="text-muted">
                                                        <span className="d-block d-sm-inline">Author : </span>{" "}
                                                        <span>{recipe?.author}</span>{" "}
                                                    </small>
                                                    <button
                                                        className="text-white align-items-end btn btn-sm btn-primary"
                                                        onClick={() => removeRecipe(recipe?._id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )
            )}


        </>
    )
        ;
};

export default SavedRecipe;
