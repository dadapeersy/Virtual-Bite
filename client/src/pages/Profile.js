import React, {useEffect, useState} from "react";
import {getUserID} from "../hooks/userID";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modals from "../components/Modal";
import Toasts from "../components/Toasts";

const Profile = () => {
    const userID = getUserID();
    const [createdRecipes, setCreatedRecipes] = useState([]);
    const [user, setUser] = useState("");
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const [recipeID, setRecipeID] = useState("");
    const getRecipes = async () => {
        if (userID) {
            try {
                const response = await axios.get(
                    `https://virtual-bite-server.vercel.app/profile/${userID}`,{
                        withCredentials: true,
                    }
                );
                setCreatedRecipes(response.data.recipes);
                setUser(response.data.user);
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        if (!userID) navigate("/auth");
        getRecipes();
    }, [createdRecipes]);

    const deleteRecipes = async () => {
        try {
            const response = await axios.delete(
                `https://virtual-bite-server.vercel.app/profile/${recipeID}`, {
                    withCredentials: true,
                }
            );
        } catch (e) {
            console.log(e);
        }
    };
    const handleLogout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };

    // Modal dialog
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Toasts dialog
    const [showToasts, setShowToasts] = useState(false);

    const handleToasts = () => {
        setShowToasts(true);
    };

    const handleCloseToasts = () => setShowToasts(false);

    return (
        <>
            <div className="container py-4 px-2">
                <div className="text-center">
                    <img
                        src="https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg"
                        className="rounded mx-auto d-block shadow"
                        width={200}
                        height={200}
                        alt="..."
                    />
                    <h2 className="pt-3">{user?.username}</h2>
                    <h6>Saved Recipes : {user?.savedRecipes?.length}</h6>
                    <button onClick={handleLogout}
                            className="btn rounded  btn-primary">
                        Logout
                    </button>
                </div>

                {createdRecipes.length === 0 ? (
                    <div className="text-center mt-3">
                        <h1 className="p-2 text-muted">No Recipes Created yet !!</h1>
                    </div>
                ) : (
                    <>
                        <div className="text-center mt-3">
                            <h1 className="p-2 text-muted">Created Recipes</h1>
                        </div>
                        <div className="d-flex justify-content-center flex-column p-0">
                            {createdRecipes.map((recipe, index) => (
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
                                                    <h6>Cooking Time : {recipe.cookingTime} Mins</h6>
                                                    <h6>Ingredients :</h6>
                                                    <ul
                                                        className="d-flex column-gap-4 flex-wrap mb-2 w-100  align-items-center overflow-hidden"
                                                        style={{
                                                            height: "46px",
                                                        }}
                                                    >
                                                        {recipe.ingredients.map((ingredient, index) => (
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
                                                        {recipe.instructions}
                                                    </p>
                                                </div>
                                                <p className="card-text d-flex justify-content-between align-items-center my-2">
                                                    <small className="text-muted">
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
                            <span className="d-block d-sm-inline">
                              Author :{" "}
                            </span>{" "}
                                                        <span>{recipe?.author}</span>
                                                    </small>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            handleShow();
                                                            setRecipeID(recipe._id);
                                                        }}
                                                        className=" text-white btn btn-sm btn-primary"
                                                    >
                                                        Delete
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/*Toasts*/}
            <Toasts
                show={showToasts}
                handleCloseToasts={handleCloseToasts}
                label={"delete"}
            />

            {/*  Modal*/}
            <Modals
                show={show}
                handleClose={handleClose}
                handleToasts={handleToasts}
                deleteRecipes={deleteRecipes}
            />
        </>
    );
};

export default Profile;
