<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CpanelApiController;
use App\Http\Controllers\RegistroController;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\NotifyController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/',[AuthController::class,'create'])->middleware('guest')->name('ViewLogin');
Route::post('/',[AuthController::class,'store'])->middleware('guest');
Route::get('/registro', [RegistroController::class,'create'])->middleware(['auth'])->name('ViewRegistro');
Route::post('/registro', [RegistroController::class,'store'])->middleware(['auth']);
Route::post('/registro/{query}', [RegistroController::class,'action'])->middleware(['auth']);
Route::post('/import/notify', [NotifyController::class,'store'])->middleware(['auth']);
Route::post('/remove/notify', [NotifyController::class,'remove'])->middleware(['auth']);
Route::get('/logout',[AuthController::class,'destroy'])->name('logout');

Route::post('/addEmail',[CpanelApiController::class,'create']);
