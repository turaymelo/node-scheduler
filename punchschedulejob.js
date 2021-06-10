
import schedule from 'node-schedule';
import mariadb from './database/mariadb.js'

console.log('Estamos a trabalhar')

const delay = (amount=758) => new Promise((resolve, reject) => setTimeout(resolve,amount))

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

await delay()
schedule.scheduleJob('*/10 * * * * *', async ()=>{
  console.log('Inicio do job - UserGroups')

  await jobCopyUserGroups()

  console.log('Fim do UserGroups')
})
await delay()
//correr o job de 3 em 3 segundos
schedule.scheduleJob('*/10 * * * * *', async ()=>{
  console.log('Inicio do job - Users')

  await jobCopyUserGroups()
  await jobCopyUsers()
  await jobCopyPunchLog()

  console.log('Fim do job - Users')
})

await delay()
schedule.scheduleJob('*/10 * * * * *', async ()=>{
  console.log('Inicio do - PunchLog')

  await jobCopyUserGroups()
  await jobCopyUsers()
  await jobCopyPunchLog()

  console.log('Fim do job - PunchLog')
})
