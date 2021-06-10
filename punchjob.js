
import { ToadScheduler, SimpleIntervalJob, Task } from 'toad-scheduler'

console.log('Estamos a trabalhar')

const scheduler = new ToadScheduler()

const task = new Task('simple task', () => {
  console.log('Corri o job')
})
const job = new SimpleIntervalJob({ seconds: 20, }, task)

scheduler.addSimpleIntervalJob(job)

// when stopping your app
scheduler.stop()
