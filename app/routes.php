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

/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
*/

Route::get('/', function()
{
  return View::make('home');
});

Route::get('/admin', function()
{
  return View::make('admin');
});

/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/

Route::get('/rsvp/{code}', 'RsvpController@show');
Route::put('/rsvp/{code}', 'RsvpController@update');

Route::get('/guests'     , 'GuestController@index');
Route::get('/guests/{id}', 'GuestController@show');
Route::put('/guests/{id}', 'GuestController@update');

Route::post('/auth/login', array('before' => 'csrf_json', 'uses' => 'AuthController@login'));
Route::get('/auth/logout', 'AuthController@logout');
Route::get('/auth/status', 'AuthController@status');

Route::post('/contact', function()
{
  $name = Input::get('name');
  $email = Input::get('email');
  $note = Input::get('note');
  $timestamp = date('r');
  $data = array('name' => $name, 'email' => $email, 'note' => $note, 'timestamp' => $timestamp); 

  Mail::send('emails.contact', $data, function($message) use ($name, $email)
  {   
    $message->from($email, $name);
    $message->to('teamleahjames@gmail.com', 'Team Leah-James')->subject('teamleahjames.com Contact Form');
    return Response::json(array('text' => 'Thanks for your message, we\'ll get back to you soon!'));
  });
});

// // Route::get('users', 'UserController@getIndex');
// Route::get('/users', function()
// {
//     // return 'Users!';
//     // return View::make('users');

//     $users = User::all();

//     return View::make('users')->with('users', $users);
// });