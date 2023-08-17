import React, {useEffect, useState} from "react";
import axios from "axios";
import {getUserID} from "../hooks/userID";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import Toasts from "../components/Toasts";

const CreateRecipe = () => {
    const navigate = useNavigate();
    const userID = getUserID();
    const [username, setUsername] = useState("");
    const [cookies, _] = useCookies(["access_token"]);
    const [showToasts, setShowToasts] = useState(false);

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [""],
        instructions: "",
        imageUrl: "",
        cookingTime: "",
        author: username,
        userOwner: userID,
    });

    useEffect(() => {
        const getUsername = async () => {
            if (userID) {
                try {
                    const response = await axios.get(
                        `https://virtual-bite-server.vercel.app/profile/${userID}`, {
                            withCredentials: true,
                        }
                    );
                    setUsername(response.data.user.username);
                    setRecipe((prevRecipe) => ({
                        ...prevRecipe,
                        author: username,
                    }));
                } catch (e) {
                    console.log(e);
                }
            }
        };
        getUsername();
    }, [username]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    };

    const handleIngredientsChange = (event, index) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({...recipe, ingredients});
    };
    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    };

    // Toasts
    const handleCloseToasts = () => setShowToasts(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!userID) navigate("/auth");
        try {
            await axios.post("https://virtual-bite-server.vercel.app/recipes", recipe,
                {
                    headers: {
                        Authorization: cookies.access_token
                    },
                    withCredentials: true,
                });
            setRecipe((prevState) => ({
                ...prevState,
                name: "",
                ingredients: [""],
                instructions: "",
                imageUrl: "",
                cookingTime: "",
            }));
            setShowToasts(true);
            // if (response.data.status) navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="container mb-5">
                <h1 className="py-4 text-center">Create Recipe</h1>
                <form onSubmit={onSubmit}
                      className="col-12 col-lg-10 m-auto row">
                    <div className="col-lg-6 col-12 ">
                        <div className="mb-3">
                            <label htmlFor="name"
                                   className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={recipe.name}
                                onChange={handleChange}
                                className="form-control"
                                required={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="imageUrl"
                                   className="form-label">
                                Image Url
                            </label>
                            <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={recipe.imageUrl}
                                onChange={handleChange}
                                className="form-control"
                                required={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cookingTime"
                                   className="form-label">
                                Cooking Time <small className="text-muted">in mins</small>
                            </label>
                            <input
                                type="text"
                                id="cookingTime"
                                name="cookingTime"
                                value={recipe.cookingTime}
                                onChange={handleChange}
                                className="form-control"
                                required={true}
                            />
                        </div>
                        {" "}
                    </div>
                    <div className="col-lg-6 col-12 ">
                        <div className="mb-3">
                            <label htmlFor="ingredients"
                                   className="form-label d-block">
                                Ingredients
                            </label>
                            {recipe.ingredients.map((ingredient, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    id="ingredients"
                                    name="ingredients"
                                    value={ingredient}
                                    className="form-control my-1"
                                    onChange={(event) => handleIngredientsChange(event, index)}
                                    required={true}
                                />
                            ))}
                            <button
                                type="button"
                                className="btn btn-sm btn-primary my-1"
                                onClick={addIngredient}
                            >
                                Add Ingredient
                            </button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="instructions"
                                   className="form-label">
                                Instructions
                            </label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                value={recipe.instructions}
                                onChange={handleChange}
                                className="form-control"
                                style={{minHeight: "80px"}}
                                required={true}
                            />
                        </div>
                        <button type="submit"
                                className="btn btn-lg btn-success w-auto">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <Toasts show={showToasts}
                    handleCloseToasts={handleCloseToasts}/>
        </>
    );
};

export default CreateRecipe;
