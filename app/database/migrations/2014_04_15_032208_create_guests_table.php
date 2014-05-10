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
      $table->string('invitation');
      $table->boolean('invitation_sent');
      $table->boolean('responded');
      $table->string('code')->unique()->index();
      $table->string('list');
      $table->boolean('attending');
      $table->enum('emotion', array('joy', 'regret'));
      $table->boolean('allow_plusone');
      $table->boolean('allow_children');
      $table->text('guest');
      $table->text('plusone');
      $table->tinyInteger('children');
      $table->string('email');
      $table->string('phone');
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