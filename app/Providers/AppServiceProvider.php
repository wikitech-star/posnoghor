<?php

namespace App\Providers;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // app name
        $siteSetting = SiteSetting::first();
        if ($siteSetting && $siteSetting->site_name) {
            Config::set('app.name', $siteSetting->site_name);
        }
    }
}
