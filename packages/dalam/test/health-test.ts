import { Server } from "../src/server/server"

const { app } = Server.Default()
const response = await app.request("/api/health")
console.log("Status:", response.status)
console.log("Body:", await response.text())
