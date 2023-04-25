import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    fetch("http://localhost:4000/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setIsAuthenticated(true);
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          throw new Error("Login failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div>
      <div className="container">
        <div className="form-div">
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
                className="form-control form-group"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
                className="form-control form-group"
              />
              <input
                type="submit"
                className="btn btn-danger btn-block"
                value="Login"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
