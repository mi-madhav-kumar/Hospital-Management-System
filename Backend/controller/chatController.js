import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const handleChatMessage = catchAsyncErrors(async (req, res, next) => {
  const { message, language } = req.body;

  if (!message) {
    return next(new ErrorHandler("Message is required", 400));
  }

  // NOTE: This is a Smart Mock Engine so the project is runnable right out of the box without requiring a Claude/Anthropic API Key.
  // To integrate real Claude AI later, you would do:
  // import Anthropic from '@anthropic-ai/sdk';
  // const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  // const msg = await anthropic.messages.create({...})

  const text = message.toLowerCase();
  let reply = "";

  // Mock AI Engine Logic based on Intent Detection
  if (language === "Hindi") {
    if (text.includes("doctor") || text.includes("appointment") || text.includes("milna")) {
      reply = "Medical appointment book karne ke liye kripya 'Appointment' form bharein ya upar menu se 'Appointment' paje par jayein. Main aapki kya sahayata karoon?";
    } else if (text.includes("dawai") || text.includes("medicine")) {
      reply = "Dawaiyon ke baare mein sahi jankari ke liye kripya doctor se paramarsh karein. Bina doctor ki salah ke dawai na lein.";
    } else if (text.includes("symptom") || text.includes("lakshan") || text.includes("bukh") || text.includes("dard")) {
      reply = "Aapke lakshano ke aadhar par aapse anurodh hai ki jald se jald hospital visit karein ya appointment book karein.";
    } else if (text.includes("hello") || text.includes("hi") || text.includes("namaste")) {
      reply = "Namaste! Main Mediant-X aapki kya madad kar sakta hoon?";
    } else {
      reply = "Main ek AI asisstant hoon. Kripya apne sawal ko aur spasht roop se puchein taaki main aapki behtar madad kar sakun.";
    }
  } else if (language === "English") {
    if (text.includes("doctor") || text.includes("appointment") || text.includes("meet")) {
      reply = "To book a medical appointment, please fill the 'Appointment' form or click on the 'Appointment' link in the top menu. How else can I assist you?";
    } else if (text.includes("medicine") || text.includes("drugs") || text.includes("pill")) {
      reply = "For proper medicine consultation, please consult a doctor. Do not take any medication without a doctor's prescription.";
    } else if (text.includes("symptom") || text.includes("pain") || text.includes("fever") || text.includes("cough")) {
      reply = "Based on your symptoms, we highly recommend you to visit the hospital or book an appointment at the earliest.";
    } else if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      reply = "Hello! I am Mediant-X. How can I help you today?";
    } else {
      reply = "I am an AI medical assistant. Could you please rephrase your question so I can assist you better?";
    }
  } else if (language === "Bhojpuri") {
    if (text.includes("doctor") || text.includes("appointment") || text.includes("milal")) {
      reply = "Doctor sahab se milal ba to 'Appointment' form bhari ja, ya upar menu me 'Appointment' pe jayi. Hum raur kaisan madad kari?";
    } else if (text.includes("dawai") || text.includes("dawaiya")) {
      reply = "Dawaiya ke chakar me bina doctor se puchle kuch na khai ja. Doctor sahab se aake mili.";
    } else if (text.includes("lakshan") || text.includes("bokhar") || text.includes("pirat")) {
      reply = "Raur lakshan dekh ke lagal ba ki jald se jald aspataal aake dekhawa li ja.";
    } else if (text.includes("pranam") || text.includes("hello") || text.includes("namaste")) {
      reply = "Pranam! Hum Mediant-X baani. Kahi, hum raur kawno madad kari?";
    } else {
      reply = "Hum ek go AI assistant baani. Raur sawal utana saf na bujhail, kripya thik se puchi tab na madad karal jayi.";
    }
  } else {
    reply = "I'm sorry, I don't understand that language yet.";
  }

  // Simulate network delay to make it feel like AI is thinking
  setTimeout(() => {
    res.status(200).json({
      success: true,
      reply
    });
  }, 1000);
});
