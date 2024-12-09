import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import '../index.css';

export default function Signup () {

    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = `${apiHost}/api/signup`;

    const { register, handleSubmit, formState: { errors }, } = useForm();

    function addNewUser(data){
        try{
            console.log(data);

            const formData = new FormData();
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            formData.append('email', data.email);
            formData.append('password', data.password);
            
            async function postData(){
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                });

                if(!response.ok){
                    throw new Error('Failed to fetch the signup API.');
                } else {
                    window.location.href = '/';
                }                
            }            
        
            postData();
            
        } catch(err) {
            console.error(err);
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
                    <input {...register("email", {required: "A valid email address is required", validate: { validFormat: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Invalid email address."}})} type="text" className="form-controlbg-light" />
                    {errors.email && <span className="text-danger">An email is required.</span>}
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input {...register("password", {required: true})} type="text" name="password" className="form-control bg-light"/>
                    {errors.password && <span className="text-danger">A valid password is required.<br></br>Your password must be more than 8 but less than 24 chars long, contain at least 1 uppercase, 1 lowercase, and 1 digit.</span>}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
            </form>
        </>
    )
}
