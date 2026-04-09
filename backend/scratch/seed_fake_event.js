import mongoose from 'mongoose';

const seedEvent = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/frolic');
        
        const eventSchema = new mongoose.Schema({}, { strict: false });
        const Event = mongoose.model('Event', eventSchema, 'events');

        const fakeEvent = {
            name: "Frolic Grand Coding Championship 2026",
            tagline: "The Ultimate Battle of Algorithms and Logic",
            description: "Join the most prestigious coding competition of the year! Participants will face multi-level challenges ranging from complex data structures to real-world system design. Competitive atmosphere, networking with industry leaders, and high-stakes problem solving await.\n\nRound 1: Rapid Debugging (60 mins)\nRound 2: Algorithmic Sprint (90 mins)\nRound 3: System Design Invitational (Expert Panel)",
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
            date: new Date("2026-05-15T10:00:00Z"),
            location: "Main Auditorium, Tower A",
            category: "Technical",
            fees: 250,
            prizes: "🥇 1st Prize: ₹50,000 + Internship Offer, 🥈 2nd Prize: ₹25,000 + Gadget Kit, 🥉 3rd Prize: ₹10,000 + Merit Certificate",
            participationType: "solo",
            groupMinParticipants: 1,
            groupMaxParticipants: 1,
            maxGroupsAllowed: 100,
            department: new mongoose.Types.ObjectId("69d33b2502fb02a781ecdffc"),
            institute: new mongoose.Types.ObjectId("69ca7c233675dab295be74a9"),
            coordinator: new mongoose.Types.ObjectId("69c8fba13e89f335c58d7aca"), 
            studentCoordinatorName: "John Doe",
            studentCoordinatorEmail: "john.coding@example.com",
            studentCoordinatorPhone: "+91 98765 43210",
            status: "Active"
        };

        await Event.create(fakeEvent);
        console.log("✅ High-quality fake event added successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
};

seedEvent();
