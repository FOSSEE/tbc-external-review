<?php
/**
 * Implementation of hook_mail().
 */
function tbc_external_review_mail($key, &$message, $params)
{
	global $user;
	$language = $message['language'];
	switch ($key) {
		case 'tbc_review_comment_email_attachment':
             $query = "
                SELECT * FROM external_review_details erd
                LEFT JOIN textbook_companion_preference pre ON erd.preference_id = pre.id
                LEFT JOIN textbook_companion_proposal pro ON pre.proposal_id = pro.id
                LEFT JOIN users usr ON pro.uid = usr.uid
                WHERE erd.preference_id = :preference_id
            ";
            $args = array(':preference_id' => params['tbc_review_comment_email_attachment']['preference_id']);
            $result = db_query($query, $args);
            $row = $result->fetchObject();
            $review_no = suffix($row->review);
            $message['attachments'] = $params['tbc_review_comment_email_attachment']['attachments'];
            $user_data = user_load($params['tbc_review_comment_email_attachment']['user_id']);
            $message['headers'] = $params['tbc_review_comment_email_attachment']['headers'];
            $message['subject'] = t('[!site_name][Textbook companion] Scilab Textbook Companion -'.  $review_no . 'Review', array(
            '!site_name' => variable_get('site_name', '')
			), array(
				'language' => $language->language
			));
			$message['body'] = array(
				'body' => t('
Dear '. $row->name,

'Please find the attached file containing the list of errors found in your uploaded book:'.
'Book: <b>' . $row->book .
'Author: <b>'. $row->author .

'Review Number:' . $review_no .

'Kindly rectify the errors and re-upload the codes on the website.
 Reply to this mail once the corrections are done.
 
<i>Note: The attachment is a comma separated file, which can be viewed using any office software.</i>

Best Wishes,

Scilab TBC Team,
FOSSEE, IIT Bombay', array(
					'!site_name' => variable_get('site_name', ''),
				), array(
					'language' => $language->language
				))
			);
			break;
		
	} //$key
}
