import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import '../index.css';

export default function Signup () {
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = `${apiHost}/api/users/signup`;

    const { register, handleSubmit, formState: { errors }, } = useForm();

    function addNewUser(data){
        try{
            console.log(data);

            const formData = {
                first_name: data.firstName,
                last_name: data.lastName,
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
            <h1>Create a new profile</h1>
            <form onSubmit={handleSubmit(addNewUser)} method="post" encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input {...register("firstName", {required: true})} type="text" name="firstName" className="form-control bg-light"/>
                    {errors.firstName && <span className="text-danger">A first name is required.</span>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input {...register("lastName", {required: true})} type="text" name="lastName" className="form-control bg-light"/>
                    {errors.lastName && <span className="text-danger">A last name is required.</span>}
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
                <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
            </form>
        </>
    )
}
