import db from '../../../models';

db.sequelize.sync().then(() => {
  console.log('Katana database sync is complete!');
});
