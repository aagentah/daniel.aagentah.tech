import fetch from 'isomorphic-unfetch';
import md5 from 'js-md5';

import formatHttpError from '~/functions/formatHttpError';

export default async (req, res) => {
  try {
    const { email, data } = req.body;
    const emailHashed = md5(email.toLowerCase());
    const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];

    // Add or update member
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHashed}`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }
    );

    // Error
    if (!response.ok) {
      throw new Error(await formatHttpError(response));
    }

    // Success
    return res.status(200).json({ error: '' });
  } catch (error) {
    // Handle catch
    console.error(
      'Error in api/mailchimp/add-or-update-member:',
      error.message || error.toString()
    );

    return res.status(500).json({ error: error.message || error.toString() });
  }
};
