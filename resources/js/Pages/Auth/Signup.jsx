import React from "react";
import BlankLayout from "../../Components/Layouts/BlankLayout";
import Input from "../../Components/Parts/Input";
import { Form, Link } from "@inertiajs/react";

function Signup() {
    return (
        <div className="bg-white rounded-box p-8 md:w-full lg:w-md shadow">
            <h1 className="text-center text-xl text-neutral font-bold">
                নতুন একাউন্ট তৈরি
            </h1>
            <p className="text-center text-neutral">
                আপনার তথ্য দিয়ে নতুন একাউন্ট তৈরি করুন।
            </p>

            <Form
                method="post"
                action={route("singup.post")}
                className="mt-5 space-y-4 flex flex-col"
            >
                {({ errors, processing }) => (
                    <>
                        <Input
                            label="নাম*"
                            name="name"
                            type="text"
                            placeholder="আপনার নাম"
                            error={errors.name}
                        />

                        <Input
                            label="ইমেইল*"
                            name="email"
                            type="emial"
                            placeholder="ইমেইল"
                            error={errors.email}
                        />

                        <Input
                            label="পাসওয়ার্ড*"
                            type="password"
                            name="password"
                            placeholder="******"
                            error={errors.password}
                        />

                        <button
                            disabled={processing}
                            type="submit"
                            className="btn btn-primary btn-sm"
                        >
                            একাউন্ট তৈরি করুন
                        </button>

                        <Link
                            href={route("login")}
                            className="link link-hover text-center mt-3"
                        >
                            একাউন্ট আছে লগিন করুন।
                        </Link>
                    </>
                )}
            </Form>
        </div>
    );
}

Signup.layout = (page) => <BlankLayout children={page} title="নতুন একাউন্ট" />;
export default Signup;
