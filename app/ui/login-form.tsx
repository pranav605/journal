'use client';

import { useActionState } from "react";
import { Button } from "./button";
import { authenticate } from "../lib/actions";
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  )
  return (
    <form action={formAction} className="grid grid-cols-1">
      <label htmlFor="email" className="block">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
        placeholder="Enter your email here"
        required
      ></input>
      <label htmlFor="password" className="pt-4 block" >Password</label>
      <input
        id="password"
        type="password"
        name="password"
        className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
        placeholder="Enter your passowrd here"
        required
      ></input>
      <div className="flex flex-row justify-between items-center mt-8">
        <Button className=" max-w-fit">
          Log in
        </Button>
        <div className="flex flex-col text-sm justify-center">
          <p>Test Credentials:</p>
          <p>Username: test@email.com</p>
          <p>Password: Test@123</p>
        </div>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}