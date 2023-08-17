import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {Button, Spinner} from "react-bootstrap";

const Auth = () => {
    const [auth, setAuth] = useState("login");
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setError(null)
        }, 4000);
    }, [error]);
    //Form
    const Form = ({
                      username,
                      setUsername,
                      password,
                      setPassword,
                      label,
                      onSubmit,
                      error,
                  }) => {
        return (
            <>
                <form onSubmit={onSubmit}
                      className="grid col-12 col-lg-4">
                    <h1 className="text-center">{label}</h1>
                    <p className="text-danger"
                       style={{height: "8px"}}>
                        {error}
                    </p>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1"
                               className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={username}
                            required={true}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1"
                               className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            required={true}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <Button type="submit"
                            className="btn btn-primary w-100"
                            disabled={loader}>
                        {label} <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className={`${loader ? 'd-inline-block' : 'd-none'}`}                    />
                    </Button>
                    <button
                        className="btn btn-link btn d-block p-0"
                        onClick={() =>
                            auth === "login" ? setAuth("register") : setAuth("login")
                        }
                    >
                        {auth === "login" ? "Signup" : "Login"}

                    </button>

                </form>
            </>
        );
    };
    //Login
    const Login = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");

        const [_, setCookies] = useCookies(["access_token"]);

        const navigate = useNavigate();
        const onSubmit = async (event) => {
            event.preventDefault();
            setLoader(true)
            try {
                const response = await axios.post("https://virtual-bite-server.vercel.app/auth/login", {
                    username: username,
                    password: password,
                }, {
                    withCredentials: true,
                });
                if (response) {
                    setLoader(false)
                }
                if (!response.data.success) {
                    return setError(response.data.message);
                }
                setError(response.data.message);
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                navigate("/");
            } catch (err) {
                console.log(err);
            }
        };
        return (
            <>
                <Form
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    label={"Login"}
                    onSubmit={onSubmit}
                    error={error}
                />
            </>
        );
    };

    //Register
    const Register = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");

        const onSubmit = async (event) => {
            event.preventDefault();
            setLoader(true)
            try {
                const response = await axios.post("https://virtual-bite-server.vercel.app/auth/signup", {
                    username,
                    password,
                }, {
                    withCredentials: true,
                });
                if (response) {
                    setLoader(false)
                }
                if (!response.data.success) {
                    return setError(response.data.message);
                }
                setError(response.data.message);
            } catch (err) {
                console.log(err);
            }
        };

        return (
            <>
                <Form
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    label={"Register"}
                    onSubmit={onSubmit}
                    error={error}
                />
            </>
        );
    };

    return (
        <>
            <div className="container d-flex justify-content-center  pt-5">
                {auth === "login" && <Login/>}
                {auth === "register" && <Register/>}
            </div>
        </>
    );
};

export default Auth;
