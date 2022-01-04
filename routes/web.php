<?php

use App\Http\Controllers\RouteController;
use Illuminate\Support\Facades\Route;

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
Route::get('/',[RouteController::class,'Login']);
Route::post('/routeLogin',[RouteController::class,'AuthLogin']);
Route::get('/registro',[RouteController::class,'Registro'])->middleware('loginAuth');