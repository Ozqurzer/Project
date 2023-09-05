import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Label } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";

import { useForm } from "react-hook-form";
import { loginUser } from '../api/auth.js';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setError('');

      const response = await loginUser(values);
      console.log('Login successful:', response);

      // Aquí podrías manejar el almacenamiento del token y la redirección
    } catch (error) {
      setError('Invalid credentials. Please try again.'); // Mensaje genérico para credenciales incorrectas
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if (isAuthenticated) {
      navigate("/profile");
    }
  
  }, [isAuthenticated]);


  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">Email:</Label>
          <Input
            label="Write your email"
            type="email"
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Write your password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && <p className="text-red-500">Password is required</p>}

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;
