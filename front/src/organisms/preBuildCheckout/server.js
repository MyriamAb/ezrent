const stripe = require('stripe')('pk_test_51IsNySAQArDV5cBDQy5GSkkhHV2FX283JHxwG4L2XiUmWfnF4og6GSznds1vfnuho1svtriLC0uZMi93WnVL9sUq00vQPVDzMJ');
const express = require('express');
const app = express();
app.use(express.static('.'));

const YOUR_DOMAIN = 'http://localhost:3000/checkout';

app.post('/create-checkout-session', async (req, res) => {

	const session = await stripe.checkout.sessions.create({
	payment_method_types: ['card'],
	line_items: [
		{
			price_data: {
				currency: 'euro',
				product_data: {
					name: 'Stubborn Attachments',
					images: ['https://i.imgur.com/EHyR2nP.png'],
				},
				unit_amount: 2000,
			},
			quantity: 1,
		},
	],
	mode: 'payment',
	success_url: `${YOUR_DOMAIN}?success=true`,
	cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));
 