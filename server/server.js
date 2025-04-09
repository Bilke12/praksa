import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'
import adminRoutes from './routes/adminRoutes.js'
import adminJobRoutes from './routes/adminJobRoutes.js'
import documentRoutes from "./routes/documentRoutes.js"
import adminApplicationRoutes from './routes/adminApplicationRoutes.js'
import adminDocumentsRoutes from "./routes/adminDocumentsRoutes.js"
import adminJobsRoutes from './routes/adminJobRoutes.js';



//Inicijalizacija Expressa
const app= express()

//Spajanje na bazu podataka
await connectDB()
await connectCloudinary()

//Middlewares
app.use(cors())
app.use(express.json())  
app.use(clerkMiddleware())

//Routes
app.get('/',(req,res)=> res.send("Api Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  app.post('/webhooks', clerkWebhooks)
  app.use('/api/company', companyRoutes)
  app.use('/api/jobs', jobRoutes)
  app.use('/api/users', userRoutes)
  app.use('/api/admin', adminRoutes)
  app.use('/api/admin', adminJobRoutes)
  app.use("/api/documents", documentRoutes)
  app.use('/api/admin', adminApplicationRoutes)
  app.use("/api/admin", adminDocumentsRoutes)
  app.use('/api/admin', adminJobsRoutes)

//Port
const PORT= process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);


 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})