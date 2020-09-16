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
import Env from '@ioc:Adonis/Core/Env';
import axios from 'axios';
import UserAgent from 'user-agents';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.get('/metalchests', async () => {
  try {
    const metalChestsId = 290145;
    const userAgent = new UserAgent({ deviceCategory: 'desktop' });

    const downloadsBadge = await axios({
      method: 'get',
      url: `http://cf.way2muchnoise.eu/full_${metalChestsId}_downloads.svg?badge_style=for_the_badge`,
      responseType: 'text',
      headers: {
        'User-Agent': userAgent.userAgent,
      },
    });

    const versionsBadge = await axios({
      method: 'get',
      url: `http://cf.way2muchnoise.eu/versions/${metalChestsId}.svg?badge_style=for_the_badge`,
      responseType: 'text',
      headers: {
        'User-Agent': userAgent.random().userAgent,
      },
    });

    return {
      downloadsBadge: downloadsBadge.data,
      versionsBadge: versionsBadge.data,
    };
  } catch (err) {
    return {
      error: Env.get('NODE_ENV') === 'development' ? err.message : 405,
    };
  }
});
