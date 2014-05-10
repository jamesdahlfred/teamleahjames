<?php

class GuestsTableSeeder extends Seeder {

  public function run()
  {
    DB::table('guests')->delete();

    $guests = array(
      array(
        'code'           => 'ABC123',
        'list'           => 'A',
        'attending'      => true,
        'emotion'        => 'joy',
        'allow_plusone'  => true,
        'allow_children' => true,
        'guest'          => json_encode(array('first' => 'John', 'last' => 'Buck', 'meal' => 'S')),
        'plusone'        => json_encode(array('first' => 'Jane', 'last' => 'Doe', 'meal' => 'S')),
        'children'       => 1,
        'email'          => 'john.doe@example.com',
        'phone'          => '5551234567',
        'address'        => '123 Main St, Anytown, USA',
        'appetizer'      => false,
        'note'           => '',
        'accomodations'  => json_encode(array('Sat' => 'Grand Budapest Hotel', 'Sun' => 'Grand Budapest Hotel')),
        'invitation'     => '',
        'created_at'     => new DateTime,
        'updated_at'     => new DateTime
      )
    );

    DB::table('guests')->insert( $guests );
  }

}

?>
