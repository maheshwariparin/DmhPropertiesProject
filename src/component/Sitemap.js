import Sitemap from 'react-router-sitemap';
import routes from './routes';

new Sitemap(routes)
  .build('https://dmhproperties.in')
  .save('./public/sitemap.xml');
