<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
  return View::make('home');
});

Route::get('/rsvp/{code}', 'RsvpController@show');
Route::put('/rsvp/{code}', 'RsvpController@update');

Route::post('/auth/login', array('before' => 'csrf_json', 'uses' => 'AuthController@login'));
Route::get('/auth/logout', 'AuthController@logout');
Route::get('/auth/status', 'AuthController@status');
Route::get('/auth/secrets','AuthController@secrets');

// Route::get('/guests', function()
// {
//   return View::make('guests');
// });

// // Route::get('users', 'UserController@getIndex');
// Route::get('/users', function()
// {
//     // return 'Users!';
//     // return View::make('users');

//     $users = User::all();

//     return View::make('users')->with('users', $users);
// });
