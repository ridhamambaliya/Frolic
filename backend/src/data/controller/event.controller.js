import Event from "../models/event.model.js";

const addEvent = async (req,res) => {
    try {
        const {
            eventName,
            category,
            date,
            location,
            maxTeams,
            participationType,
            minPlayersInTeam,
            maxPlayersInTeam,
            registrationFees,
            registrationDeadline,
            eventDescription,
            rulesAndRegulation,
            firstPrize,
            secondPrize,
            thirdPrize,
        } = req.body;

        const coordinator = '699024745db40139d5962a60';

    const newEvent = new Event({
      eventName,
      category,
      date,
      location,
      coordinator,
      maxTeams,
      participationType,
      minPlayersInTeam:
        participationType === "Team" ? minPlayersInTeam : undefined,
      maxPlayersInTeam:
        participationType === "Team" ? maxPlayersInTeam : undefined,
      registrationFees,
      registrationDeadline,
      eventDescription,
      rulesAndRegulation,
      firstPrize,
      secondPrize,
      thirdPrize,
    });

    await newEvent.save()
        
    res.status(201).json({
        message: "Event Added successfully",
        event: newEvent,
    });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
            message: "Event name already exists",
        });
    }
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
} 


const getAllEvent = async (req, res) => {
    try {
        const allEvents=await Event.find();
        console.log(allEvents);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({message: "event not found"});
    }
}
export {addEvent, getAllEvent}