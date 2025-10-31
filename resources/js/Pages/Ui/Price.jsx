import React from "react";
import GuestLayout from "../../Components/Layouts/GuestLayout";
import { ENGLISH_TO_BANGLA } from "../../Utils/Helper";
import { ShoppingCart, Verified } from "lucide-react";

function Price() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* title */}
            <div className="bg-primary">
                <div className="container py-15">
                    <div className="max-w-[600px] mx-auto text-center">
                        <h1 className="text-3xl font-bold text-neutral">
                            মূল্য তালিকা
                        </h1>
                        <p className="text-base font-normal mt-3 text-neutral">
                            আমাদের সেবাসমূহের সর্বশেষ মূল্য তালিকা দেখুন এবং
                            আপনার প্রয়োজন অনুযায়ী উপযুক্ত প্যাকেজটি বেছে নিন।
                            চাইলে আপনি নিজের মতো করে একটি কাস্টম প্যাকেজও তৈরি
                            করতে পারেন — সম্পূর্ণ আপনার চাহিদা ও বাজেট অনুযায়ী।
                        </p>
                    </div>
                </div>
            </div>

            {/* prices */}
            <div className="mt-10 container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-3">
                    {/* cart */}
                    <div className="bg-white rounded-box border border-dashed border-primary/40 p-6 shadow-[0_0_100px_rgba(0,0,0,0.05)] duration-300 hover:shadow-[0_0_80px_rgba(0,0,0,0.1)]">
                        {/* heade */}
                        <div className="w-full relative">
                            <h1 className="text-neutral font-bold text-lg">
                                কোচিং সেন্টার
                            </h1>
                            <h1 className="text-2xl font-extrabold text-neutral my-2.5">
                                ৳১০০
                            </h1>
                            <p className="text-sm text-gray-600">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sed, accusamus?
                            </p>

                            <span className="bg-primary rounded-box text-xs font-semibold text-neutral absolute right-0 top-0 px-3 py-0.5">
                                ৫০% বাচবে
                            </span>
                        </div>

                        <div className="mt-4">
                            <h1 className="text-sm font-extrabold text-neutral mb-2">
                                🎓 আপনি যেসব শ্রেণি পাচ্ছেন
                            </h1>
                            <div className="flex flex-col gap-1 pl-3">
                                <h1 className="flex items-center gap-2 text-sm font-normal">
                                    <Verified
                                        size={14}
                                        className="text-green-500"
                                    />
                                    <span>প্রথম শ্রেনী</span>
                                </h1>
                                <h1 className="flex items-center gap-2 text-sm font-normal">
                                    <Verified
                                        size={14}
                                        className="text-green-500"
                                    />
                                    <span>২য় শ্রেনী</span>
                                </h1>
                                <h1 className="flex items-center gap-2 text-sm font-normal">
                                    <Verified
                                        size={14}
                                        className="text-green-500"
                                    />
                                    <span>৫ম শ্রেনী</span>
                                </h1>
                            </div>
                            <h1 className="text-sm font-extrabold text-neutral mt-3 mb-2">
                                📚 আপনি যেসব বিষয় পাচ্ছেন
                            </h1>
                            <div className="flex flex-col gap-1 pl-3">
                                <h1 className="flex items-center gap-2 text-sm font-normal">
                                    <Verified
                                        size={14}
                                        className="text-green-500"
                                    />
                                    <span>প্রথম শ্রেনী</span>
                                </h1>
                                <h1 className="flex items-center gap-2 text-sm font-normal">
                                    <Verified
                                        size={14}
                                        className="text-green-500"
                                    />
                                    <span>২য় শ্রেনী</span>
                                </h1>
                                <h1 className="flex items-center gap-2 text-sm font-normal">
                                    <Verified
                                        size={14}
                                        className="text-green-500"
                                    />
                                    <span>৫ম শ্রেনী</span>
                                </h1>
                            </div>
                        </div>

                        <button className="btn btn-sm btn-primary w-full mt-4">
                            <ShoppingCart size={14} />
                            ক্রয় করুন
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Price.layout = (page) => <GuestLayout children={page} title="মূল্য তালিকা" />;
export default Price;
