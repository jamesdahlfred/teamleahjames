<?php

class UsersTableSeeder extends Seeder {

  public function run()
  {
    DB::table('users')->delete();

    $users = array(
      array(
        'name'       => 'James',
        'email'      => 'groom@teamleahjames.com',
        'password'   => Hash::make('teamleahjames'),
        'created_at' => new DateTime,
        'updated_at' => new DateTime
        ),
      array(
        'name'       => 'Leah',
        'email'      => 'bride@teamleahjames.com',
        'password'   => Hash::make('teamleahjames'),
        'created_at' => new DateTime,
        'updated_at' => new DateTime
        )
      );

    DB::table('users')->insert( $users );
  }

}

?>
