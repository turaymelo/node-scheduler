
import schedule from 'node-schedule';
import mariadb from './database/mariadb.js'

console.log('Estamos a trabalhar')

async function jobCopyUsers() {
  let conn;
  try {
    conn = await mariadb.getConnection();
    await conn.query('Call jobCopyUsers');
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

async function jobCopyUserGroups() {
  let conn;
  try {
    conn = await mariadb.getConnection();
    await conn.query('Call jobCopyUserGroups');
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

async function jobCopyPunchLog() {
  let conn;
  try {
    conn = await mariadb.getConnection();
    await conn.query('Call jobCopyPunchLog');
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}


//Correr o job numa data especifica
// const aData = new Date('2021-05-29T11:38:00')

// schedule.scheduleJob(aData, ()=>{
//     console.log('Corri o job')
// })

//correr o job de 3 em 3 segundos
schedule.scheduleJob('*/10 * * * * *', async ()=>{
    console.log('Inicio do job')

    await jobCopyUserGroups()
    await jobCopyUsers()
    await jobCopyPunchLog()

    console.log('Fim do job')
})
