import React, { useState, useEffect } from "react";
import { Card, Button, Input, Label } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";

import { useForm } from "react-hook-form";
import { slackpost } from "../api/auth";

function Slack() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("klik");
    console.log(values);
    try {
      setLoading(true);

      const response = await slackpost(values);
      console.log("Message successful:", response);

      // Aquí podrías manejar el almacenamiento del token y la redirección
    } catch (error) {
      console.error("Slack message error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        <h1 className="text-2xl font-bold">Slack</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="textSlack">Your messega for class:</Label>
          <Input
            label="Write your email"
            type="textarea"
            id="textSlack"
            name="textSlack"
            placeholder="yourmessages"
            {...register("message")}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Sende text..." : "fertig"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Slack;
