// mercadopago-service.js
import Env from 'react-native-config';

// You should create the preference server-side, not client-side 
// but we show client-side for the sake of simplicity

const token = 'TEST-5266322306314089-101818-5ffbc183689ee391c3708d1ea230ac61-257493616';

export const getPreferenceId = async (payer, ...items) => {
  const response = await fetch(
    `https://api.mercadopago.com/checkout/preferences?access_token=${token}`,
    {
      method: 'POST',
      body: JSON.stringify({
        items,
        payer: {
          email: payer,
        },
      }),
    }
  );

  const preference = await response.json();

  return preference.id;
};