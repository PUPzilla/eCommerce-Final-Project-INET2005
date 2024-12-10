import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../index.css";

export default function Login() {
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = `${apiHost}/api/login`;

    const [ loginfail, setLoginFail ] = useState(null);
    const { register, handleSubmit, formState: {errors} } = useForm();

    async function loginUser(data){
        try{
            console.log(data);
            
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if(!response.ok){
                setLoginFail(true);
            }

            window.location.href = '/';

        } catch(err){

        }
    }

    return(
        <>
        <h1>Login Page</h1>
        {loginfail && <p className="text-danger">Incorrect email address or password</p>}
        <form onSubmit={handleSubmit} method="post" className="w-25">
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input {...register("email", { required: "Email is required." })} type="text" className="form-control bg-light" />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input {...register("password", { required: "Password is required." })} type="password" className="form-control bg-light" />
                {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <Link to="/" className="btn btn-outline-dark ms-2">Cancel</Link>            
        </form>
        <p className="mt-4">Don't have an account?<Link to="/signup">Sign-up</Link> today.</p> 
        </>
    );
};
