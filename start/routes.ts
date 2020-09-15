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

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.get('/metalchests', async () => {
  try {
    interface GameVersion {
      gameVersion: string;
      projectFileId: number;
      projectFileName: string;
      fileType: number;
      gameVersionFlavor: undefined;
    }

    const resp = await axios({
      method: 'get',
      url: 'https://addons-ecs.forgesvc.net/api/v2/addon/290145',
      responseType: 'json',
    });
    const data = resp.data;
    const gameVersions: Array<GameVersion> = data.gameVersionLatestFiles;
    const versions: string[] = [];

    gameVersions.forEach(version => {
      versions.push(version.gameVersion);
    });

    return {
      downloadCount: numberWithCommas(data.downloadCount),
      versions: versions,
    };
  } catch (err) {
    return { error: err };
  }
});
