<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', '\App\Http\Controllers\AuthController@login');
    Route::post('register', '\App\Http\Controllers\UsuarioController@register');
    Route::get('usuarios', '\App\Http\Controllers\UsuarioController@getAll');
    Route::post('delete', '\App\Http\Controllers\UsuarioController@delete');
    Route::post('user', '\App\Http\Controllers\UsuarioController@user');
    Route::post('busca', '\App\Http\Controllers\UsuarioController@busca');
});
