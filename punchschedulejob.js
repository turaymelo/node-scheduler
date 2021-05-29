
import schedule from 'node-schedule';

console.log('Estamos a trabalhar')


//Correr o job numa data especifica
// const aData = new Date('2021-05-29T11:38:00')

// schedule.scheduleJob(aData, ()=>{
//     console.log('Corri o job')
// })

//correr o job de 3 em 3 segundos
schedule.scheduleJob('*/3 * * * * *', ()=>{
    console.log('Corri o job')
})
