/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';
import axios from 'axios';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.get('/metalchests', async () => {
  try {
    const METAL_CHESTS_ID = 290145;

    const downloadsBadge = await axios({
      method: 'get',
      url: `https://cf.way2muchnoise.eu/full_${METAL_CHESTS_ID}_downloads.svg?badge_style=for_the_badge`,
      responseType: 'text',
    });

    const versionsBadge = await axios({
      method: 'get',
      url: `http://cf.way2muchnoise.eu/versions/${METAL_CHESTS_ID}.svg?badge_style=for_the_badge`,
      responseType: 'text',
    });

    return {
      downloadsBadge: downloadsBadge.data,
      versionsBadge: versionsBadge.data,
    };
  } catch (err) {
    return err;
  }
});
