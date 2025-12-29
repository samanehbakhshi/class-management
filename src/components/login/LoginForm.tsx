"use client";

import { useState } from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../../app/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const supabase = supabaseBrowser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.replace("/"); // یا dashboard
    router.refresh();
  }

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="border-b border-stroke px-4 py-4 font-medium text-dark dark:border-dark-3 dark:text-white sm:px-6 xl:px-7.5">
          ثبت نام
        </h2>
        <div className="p-4 sm:p-6 xl:p-10 !p-6.5">
          <div className="mb-4.5">
            <label
              htmlFor="_S_6_"
              className="text-body-sm font-medium text-dark dark:text-white"
            >
              ایمیل
            </label>
          </div>
          <div className="relative mt-3 [&_svg]:absolute [&_svg]:right-4.5 [&_svg]:top-1/2 [&_svg]:-translate-y-1/2">
            <input
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4.5 mt-3">
            <label
              htmlFor="_S_6_"
              className="text-body-sm font-medium text-dark dark:text-white"
            >
              رمز عبور
            </label>
          </div>
          <div className="relative mt-3 [&_svg]:absolute [&_svg]:right-4.5 [&_svg]:top-1/2 [&_svg]:-translate-y-1/2">
            <input
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-599 text-sm">{error}</p>}
        <div className="mb-4.5">
          <Button
            disabled={loading}
            label="ورود"
            type="submit"
            shape="rounded"
            className="flex w-full mt-5"
          />
        </div>
      </form>
    </div>
  );
}
