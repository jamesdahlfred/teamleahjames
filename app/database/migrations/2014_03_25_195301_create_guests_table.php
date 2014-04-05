<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGuestsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('guests', function(Blueprint $table)
		{
      $table->increments('id');
      $table->string('code')->unique()->index();
      $table->string('list');
      $table->boolean('attending');
      $table->enum('emotion', array('joy', 'regret'));
      $table->boolean('allow_plusone');
      $table->boolean('allow_children');
      $table->text('guest');
      $table->text('plusone');
      $table->integer('children');
      $table->string('email');
      $table->string('phone',10);
      $table->text('address');
      $table->boolean('appetizer');
      $table->text('note');
      $table->string('accomodations');
      $table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('guests');
	}

}

/*

Attendance
( ) Yes, I'm coming! ( ) No, I/we must regretfully decline.

Your Name                        Your Meal
_First_________ _Last___________ ( ) Seafood, Chicken, etc ( ) Vegetarian

Guest Name                       Guest Meal
_First_________ _Last___________ ( ) Seafood, Chicken, etc ( ) Vegetarian

This is awkward, but we didn't give you a plus one. We simply can't invite everybody we'd like to. Please don't be hurt! Please come anyway!

Children
_First_________ ( ) Kids meal ( ) Seafood, Chicken, etc ( ) Vegetarian (-)
_First_________ ( ) Kids meal ( ) Seafood, Chicken, etc ( ) Vegetarian (-)
_First_________ ( ) Kids meal ( ) Seafood, Chicken, etc ( ) Vegetarian (-)
(+) Add Child

Contact Info
We'd need reliable way to let you know if something big changes. Remember
that wedding where it blizzarded and the governor closed all the roads 
and the wedding had to be put off a day? We don't expect snow in June, but
who knows, this is New England.

_Address______________________________________________________________
______________________________________________________________________
______________________________________________________________________
_Email Address____________________  _Phone Number_____________________

Appetizer
This is for people who aren't travelling a great distance, or enterprising sould with a kitchen in their hotel room.

Can you bring an appetizer for the cocktail hour? ( ) Yes ( ) No

*/

