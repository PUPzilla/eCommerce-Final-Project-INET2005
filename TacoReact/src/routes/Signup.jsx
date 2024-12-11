import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import '../index.css';

export default function Signup () {
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = `${apiHost}/api/users/signup`;

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [status, setStatus] = useState("Create a new user profile.");

    function addNewUser(data){
        try{
            console.log(data);

            const formData = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
            };
            
            async function postData(){
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify(formData),
                    });

                    if(!response.ok){
                        throw new Error('Failed to fetch the signup API.');
                    } else {
                        setStatus("User created successfully.");
                        setTimeout(() => (window.location.href = '/'), 2000);
                    }
                    
                }

            postData();
        } catch(errors) {
            console.error(errors.message);
        }
    }

    return(
        <>
            <h1>{status}</h1>
            <form onSubmit={handleSubmit(addNewUser)} method="post" encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input {...register("first_name", {required: true})} type="text" name="first_name" className="form-control bg-light"/>
                    {errors.first_name && <span className="text-danger">A first name is required.</span>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input {...register("last_name", {required: true})} type="text" name="last_name" className="form-control bg-light"/>
                    {errors.last_name && <span className="text-danger">A last name is required.</span>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input {...register("email", {required: "A valid email address is required", validate: { validFormat: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Invalid email address."}})} type="text" name="email" className="form-control bg-light"/>
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input {...register("password", {required: true})} type="password" name="password" className="form-control bg-light"/>
                    {errors.password && <span className="text-danger">A valid password is required.<br />Your password must be between 8-24 characters long, include at least one uppercase letter, one lowercase letter, and one digit.</span>}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger ms-3">Cancel</Link>
            </form>
        </>
    )
}
