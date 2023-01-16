import cluster from "node:cluster";
import { cpus } from "node:os";
import process, { pid } from "node:process";
import { usersData } from "./db/usersData";

const numCPUs = cpus().length;
const PORT = Number(process.env.PORT);

(async () => {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running on port: ${PORT}`);

    function messageHandler({ method, pid, user }: any) {
      for (const id in cluster.workers) {
        if (cluster.workers[id]!.process.pid === pid) {
          if (method === "getUsers") {
            cluster.workers[id]?.send({ users: usersData });
          }
          if (method === "addUser") {
            usersData.users.push(user);
          }
        }
      }
    }

    for (let i = 0; i < numCPUs; i++) {
      let workerPORT = PORT + i + 1;
      cluster.fork({ PORT: workerPORT });
    }

    for (const id in cluster.workers) {
      cluster.workers[id]!.on("message", messageHandler);
    }

    cluster.on("exit", (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    console.log(`Worker ${process.pid} started on port: ${process.env.PORT}`);
    await import("./index");
  }
})();
