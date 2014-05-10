<?php

class GuestController extends BaseController {

	/**
	 * GET /resource
	 * Display a listing of the resource.	 
	 *
	 * @return Response
	 */
	public function index()
	{
		if (Auth::check()) {
			$results = DB::select('SELECT * FROM guests ORDER BY list, invitation, guest');
			if (count($results) > 0) {
				foreach ($results as $i => $j) {
					foreach ($j as $k => $val) {
						if ((substr($val, 0, 1) == '{' && substr($val, -1, 1) == '}') || (substr($val, 0, 1) == '[' && substr($val, -1, 1) == ']')) {
							$results[$i]->$k = json_decode($val);
						}
					}
				}
			}
			return Response::json($results);
		}
	}

	/**
	 * GET /resource/create
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		if (Auth::check()) {
			return Response::json();
		}
	}

	/**
	 * POST /resource
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		if (Auth::check()) {
			$code = Code::generate();
			DB::insert('INSERT INTO guests (
        code
        list
        attending
        emotion
        allow_plusone
        allow_children
        guest
        plusone
        children
        email
        phone
        address
			  appetizer
			  note
        accomodations
        invitation
        created_at
        updated_at
			) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', array(
				Input::get('code'),
				Input::get('list'),
				substr(Input::get('attending'),0,1),
				substr(Input::get('attending'),1),
        Input::get('allow_plusone'),
        Input::get('allow_children'),
        json_encode(Input::get('guest')), 
				json_encode(Input::get('plusone')), 
				Input::get('children'),
				Input::get('email'),
				Input::get('address'),
				Input::get('phone'),
				Input::get('appetizer'),
				Input::get('note'),
				Input::get('accomodations'),
				Input::get('invitation'),
				new DateTime,
				new DateTime
			));
			return Response::json();
		}
	}

	/**
	 * GET /resource/{resource}
	 * Display the specified resource.
	 *
	 * @param  string  $code
	 * @return Response
	 */
	public function show($id)
	{
		$results = DB::select('SELECT id, code, CONCAT(attending, emotion) AS attending, allow_plusone, allow_children, guest, plusone, children, email, phone, address, appetizer, note, accomodations, invitation FROM guests WHERE id = ?', array($id));
		if (count($results) > 0) {
			foreach ($results as $i => $j) {
				foreach ($j as $k => $val) {
					if ((substr($val, 0, 1) == '{' && substr($val, -1, 1) == '}') || (substr($val, 0, 1) == '[' && substr($val, -1, 1) == ']')) {
						$results[$i]->$k = json_decode($val);
					}
				}
			}
			return Response::json($results);
		} else {
			return Response::json(array('text' => 'That guest doesn\'t exist. Try again?'), 500);
		}
	}

	/**
	 * GET /resource/{resource}/edit
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$results = DB::select('SELECT * FROM guests WHERE id = ?', array($id));
		return Response::json($results);
	}

	/**
	 * PUT/PATCH /resource/{resource}
	 * Update the specified resource in storage.
	 *
	 * @param  string  $code
	 * @return Response
	 */
	public function update($id)
	{
		DB::update('UPDATE guests SET code = ?, attending = ?, emotion = ?, guest = ?, plusone = ?, children = ?, email = ?, address = ?, phone = ?, appetizer = ?, note = ?, invitation = ?, updated_at = ? WHERE id = ?', array(
			Input::get('code'),
			substr(Input::get('attending'),0,1),
			substr(Input::get('attending'),1),
      json_encode(Input::get('guest')),
			json_encode(Input::get('plusone')),
			Input::get('children'),
			Input::get('email'),
			Input::get('address'),
			Input::get('phone'),
			Input::get('appetizer'),
			Input::get('note'),
			Input::get('invitation'),
			new DateTime,
			$id
		));
		return Response::json(array('text' => 'Response saved!'));
	}

	/**
	 * DELETE /resource/{resource}
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		DB::delete('DELETE FROM guests WHERE id = ?', array($id));
		return Response::json();
	}

}