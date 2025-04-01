import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        console.log("🔗 Webhook received:", req.body);

        // ⚡ Odmah odgovori Clerk API-ju kako bi izbjegao timeout
        res.status(200).json({ success: true, message: "Webhook received" });

        // Provjeri da li su svi potrebni headeri prisutni
        if (!req.headers["svix-id"] || !req.headers["svix-timestamp"] || !req.headers["svix-signature"]) {
            console.log("❌ Missing Svix headers");
            return;
        }

        // Svix instanca sa Clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verifikacija Clerk Webhook-a
        try {
            whook.verify(JSON.stringify(req.body), {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            });
        } catch (error) {
            console.log("❌ Webhook verification failed:", error.message);
            return;
        }

        // Dobivanje podataka iz requesta
        const { data, type } = req.body;
        console.log(`📩 Event type: ${type}`, data);

        switch (type) {
            case "user.created":
                await User.create({
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url
                });
                console.log("👤 User created:", data.id);
                break;

            case "user.updated":
                await User.findByIdAndUpdate(data.id, {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url
                });
                console.log("🔄 User updated:", data.id);
                break;

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                console.log("🗑️ User deleted:", data.id);
                break;

            default:
                console.log("⚠️ Unknown event type:", type);
        }
    } catch (error) {
        console.error("🚨 Webhook error:", error.message);
    }
};
