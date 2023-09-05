import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Label, Button } from '../components/ui'
import { useAuth } from "../context/authContext";
import { registerUser } from '../api/auth.js';
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterPage() {
    const { isAuthenticated } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            const response = await registerUser(values);
            console.log('Registration successful:', response);
            navigate("/login"); // Redirige a la página de perfil después del registro exitoso
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/profile");
    }, [isAuthenticated]);

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <Card >
               
                <div className="bg-gray-100 max-w-md w-full p-10 rounded-md ">
                    <h1 className="text-3xl font-bold">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Label htmlFor="username">Name:</Label>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Write your name"
                            {...register("name")}
                            autoFocus
                        />
                        {errors.name?.message && (
                            <p className="text-red-500">{errors.name?.message}</p>
                        )}


                        <Label htmlFor="email">Email:</Label>
                        <Input
                            name="email"
                            placeholder="youremail@domain.tld"
                            {...register("email",
                                { required: true })}
                        />
                        {errors.email?.message && (
                            <p className="text-red-500">{errors.email?.message}</p>
                        )}

                        <Label htmlFor="role">Role:</Label>
                        <div className="flex items-center space-x-4">
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    {...register("role", { required: true })}
                                />
                                Student
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="tutor"
                                    {...register("role", { required: true })}
                                />
                                Tutor
                            </label>

                        </div>
                        {errors.role && <p className="text-red-500">Role is required</p>}

                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="********"
                            {...register("password",
                                { required: true })}
                        />
                        {
                            errors.password && <p className="text-red-500"> Password is required</p>
                        }
                        <Label htmlFor="confirmPassword">Confirm Password:</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="********"
                            {...register("confirmPassword",
                                { required: true })}
                        />
                        {
                            errors.password && <p className="text-red-500"> Password is required</p>
                        }

                        <Button>Submit</Button>
                    </form>
                    <p>
                        Already Have an Account?
                        <Link className="text-sky-500" to="/login"> Login
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default RegisterPage