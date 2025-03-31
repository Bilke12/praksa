import { Webhook } from "svix";
import User from "../models/User.js"

//Api kontroler fukcija za clerk usere
export const clerkWebhooks = async(req,res)=>{
    try {  

        // Svix istanca sa clerk webhook secret
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //Potvrda headera
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix.id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        })

        // Dobivanje podataka od request body-a 
        const {data, type} = req.body
        //Switch case 
        switch (type) {
            case 'user.created':{
                const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_address,
                    name : data.first_name + " " + data.last_name,
                    image: data.image_url
                }
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated':{
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name : data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
                
            default:
                break;
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:'Webhooks Error'})
    }
}