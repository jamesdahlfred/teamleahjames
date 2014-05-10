<?php

class ContactController extends BaseController {

	/**
	 * POST /resource
	 * Send an email
	 *
	 * @return Response
	 */
	public function send()
	{
		Mail::send('emails.contact', array('name' => Input::get('name'), 'email' => Input::get('email'), 'note' => Input::get('note'), 'timestamp' => date('r')), function($message)
		{
			$message->from(Input::get('email'), Input::get('name'));
			$message->to('teamleahjames@gmail.com', 'Team Leah-James')->subject('teamleahjames.com Contact Form');
			return Response::json(array('text' => 'Thanks for your message, we\'ll get back to you soon!'));
		});
	}

}