import { useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser, isLoading, isError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const loggedin =  await loginUser({ email, password });
        if (loggedin) {
          navigate("/profile");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
  };

  return (
    <div>
      <h1>Login</h1>
      {isError && <p>There was an error logging in.</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
