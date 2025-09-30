<?php

namespace App\Providers;

use App\Models\MailConfig;
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

        // smtp setting
        $mailSettings = MailConfig::first();
        if ($mailSettings) {
            $config = [
                'driver' => $mailSettings->mail_mailer,
                'host' => $mailSettings->mail_host,
                'port' => $mailSettings->mail_port,
                'username' => $mailSettings->mail_username,
                'password' => $mailSettings->mail_password,
                'encryption' => $mailSettings->mail_encryption,
                'from' => [
                    'address' => $mailSettings->mail_from_address,
                    'name' => config('app.name'),
                ],
            ];
            Config::set('mail', $config);
        }
    }
}
