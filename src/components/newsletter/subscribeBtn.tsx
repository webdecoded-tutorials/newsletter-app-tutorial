"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import subscribeToNewsletter from "@/actions/subscribeToNewsletter";
import { useActionState } from "react";

const SubscribeBtn = () => {
  const [message, formAction] = useActionState(subscribeToNewsletter, "");
  console.log(message);

  return (
    <form action={formAction}>
      <div className="flex space-x-2">
        <Input type="email" name="email" className="max-w-lg flex-1" placeholder="Enter your email" /><Button type="submit">Subscribe</Button></div>
      <div className="flex items-center mt-2">{message && <p>{message}</p>}</div>
    </form>
  );
}

export default SubscribeBtn;