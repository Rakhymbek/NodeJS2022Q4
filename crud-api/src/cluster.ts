import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';

const numCPUs = cpus().length;
const PORT = Number(process.env.PORT);

(async () => {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running on port: ${PORT}`);

    for (let i = 0; i < numCPUs; i++) {
      let workerPORT = PORT + i + 1;
      cluster.fork({ PORT: workerPORT });
    }

    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    console.log(`Worker ${process.pid} started on port: ${process.env.PORT}`);
    await import('./index')
  }
})()