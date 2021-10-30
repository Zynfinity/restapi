let __path = process.cwd(),
monk = require('monk'),
{ color } = require(__path + '/lib/color.js')

// Connection URL
let url = 'https://api-velgrynd.herokuapp.com';
try {
if(url == 'https://api-velgrynd.herokuapp.com') throw console.log(color('Cek konfigurasi database, var url belum diisi','red'));
} catch (e) {
return;
}
let db = monk(url);

db.then(() => {
  console.log(color('Connected correctly to server','green'))
})
.catch ((e) => {
  console.log(color('Error : '+ e +'\n\nGagal connect ke database, \ncek configurasi database apakah Connection URL sudah benar','red'))
})


module.exports = db