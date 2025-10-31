<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PriceController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Ui/Price');
    }
}
