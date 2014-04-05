<?php

class UsersTableSeeder extends Seeder {

  public function run()
  {
    DB::table('users')->delete();

    $users = array(
      array(
        'name'       => 'James',
        'email'      => 'james.dahlfred@gmail.com',
        'password'   => Hash::make('dishanddrink'),
        'created_at' => new DateTime,
        'updated_at' => new DateTime
        ),
      array(
        'name'       => 'Leah',
        'email'      => 'leahburnett77@gmail.com',
        'password'   => Hash::make('dishanddrink'),
        'created_at' => new DateTime,
        'updated_at' => new DateTime
        )
      );

    DB::table('users')->insert( $users );
  }

}

?>
