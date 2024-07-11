import Message from "@/models/Messages";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// POST /api/messages
export const POST = async (req) => {
  try {
    await connectDB();

    const { email, name, phone, message, recipient, property } =
      await req.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({
          message: "You must be logged in to send the message",
        }),
        { status: 400 }
      );
    }

    const { user } = sessionUser;

    // If the recipient is the owner of the property
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "Cannot send a message to yourself" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
