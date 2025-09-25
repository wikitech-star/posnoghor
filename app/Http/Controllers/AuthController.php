<?php

namespace App\Http\Controllers;

use App\Models\GroupClass;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    // login ===============
    public function login()
    {
        return Inertia::render("Auth/Login");
    }

    public function login_store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6'
        ], [
            'email.required' => 'ইমেইল প্রদান করুন',
            'emial.email' => 'ইমেইল সঠিক নয়',
            'email.exists' => 'এই ইমেইলটি খুজে পাওয়া যায়নি',
            'password.required' => 'পাসওয়ার্ড প্রদান করুন',
            'password.min' => "পাসওয়ার্ড সর্বনিম্ন ৬ সংখ্যার হতে পারবে।"
        ]);

        try {
            // login account
            if (Auth::attempt($request->only('email', 'password'), $request->remeber)) {
                return redirect()->intended(route('ux.dashboard'));
            } else {
                return redirect()->back()->with('error', 'লগিন তথ্য সঠিক নয়.');
            }
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // sing up ================
    public function singup()
    {
        return Inertia::render("Auth/Signup");
    }
    public function singup_update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ], [
            'name.required' => 'নাম প্রদান করুন',
            'name.string' => 'নাম সঠিক নয়',
            'name.max' => 'নাম সর্বোচ্চ ২৫৫ অক্ষরের হতে পারবে।',
            'email.required' => 'ইমেইল প্রদান করুন',
            'emial.email' => 'ইমেইল সঠিক নয়',
            'email.unique' => 'এই ইমেইলটি ইতিমধ্যে ব্যবহৃত হয়েছে।',
            'password.required' => 'পাসওয়ার্ড প্রদান করুন',
            'password.min' => "পাসওয়ার্ড সর্বনিম্ন ৬ সংখ্যার হতে পারবে।",
        ]);

        try {
            $use = new User();
            $use->name = $request->name;
            $use->email = $request->email;
            $use->password = bcrypt($request->password);
            $use->save();

            // login account
            if (Auth::attempt($request->only("email", "password"), true)) {
                return redirect()->route('ux.dashboard');
            } else {
                return redirect()->route('login')->with('success', 'একাউন্ট তৈরি করা সফল হয়েছে। লগইন করুন.');
            }
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // choice role ==============
    public function choice_role()
    {
        return Inertia::render('Auth/ChoiceRole', [
            'class_data' => GroupClass::orderBy('name')->pluck('name', 'id')->toArray(),
        ]);
    }
    public function choice_role_update(Request $request)
    {
        $request->validate([
            'role' => 'required|in:teacher,student'
        ], [
            'role.required' => 'একাউন্ট এর ধরন নির্বাচন করুন।',
            'role.in' => 'একাউন্ট এর ধরন সঠিক নয়।',
        ]);

        try {
            $user = Auth::user();
            $user->role = $request->role;
            $user->save();

            return redirect()->route('ux.dashboard')->with('success', 'একাউন্ট এর ধরন সফলভাবে সংরক্ষিত হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }


    // forgate password ===============
    public function forgate()
    {
        return Inertia::render("Auth/Forget");
    }

    public function forgate_update(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.required' => 'ইমেইল প্রদান করুন',
            'emial.email' => 'ইমেইল সঠিক নয়',
            'email.exists' => 'এই ইমেইলটি খুজে পাওয়া যায়নি',
        ]);

        try {
            

            return redirect()->back()->with('success', 'পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // logout =================
    public function logout()
    {
        try {
            Auth::logout();
            return redirect()->route('login');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
