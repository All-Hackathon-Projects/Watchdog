▒█░░░▄░░▒█─░▄█▀▄─▒█▀█▀█░▐█▀█░▐█░▐█░▐█▀█▄▒▐█▀▀█▌░▐█▀▀▀─
▒█░░▒█░░▒█░▐█▄▄▐█░░▒█░░░▐█──░▐████░▐█▌▐█▒▐█▄▒█▌░▐█░▀█▌
░▒▀▄▀▒▀▄▀░░▐█─░▐█░▒▄█▄░░▐█▄█░▐█░▐█░▐█▄█▀▒▐██▄█▌░▐██▄█▌


Watchdog is an innovative, real-time analytics platform built to help teachers engage better with their students.



Inspiration: 
Every student can admit to spacing out every once in a while. But what if there was a way for teachers to track the engagement of their classroom in real time? We built Watchdog to do precisely that - offer a platform for teachers to better engage with students.

What it does:
Watchdog uses advanced facial recognition APIs provided by Microsoft in order to identify attributes of faces in a photo that would be collected from a camera placed at the front of a classroom. Such attributes include relative emotions, along with the position of facial features in 3D space. Through examination of these properties, we assign an "engagement score" for students in the classroom, which is updated live in order to provide an educator with immediate feedback on their lesson. We also implemented facial tracking across different periods, which allows teachers to view aggregate data for individual students or an entire class after the period has finished. Such reports would be particularly useful in analyzing long-term trends along with comparison to other teacher's reports, leading to collaboration and discovery of more effective teaching methods. Additionally, the same face tracking algorithms are used to easily take attendance of a classroom based on just a few pictures.

How we built it:
The crux of the application is built using Microsoft's Cognitive Services platform, or MCG. MCG can offer useful analytics for a single image, but also allowed us to train the model to recognize the same person, even if a different picture was provided. We take a snapshot of the classroom at regular intervals (usually 1-3 seconds), and query Microsoft for a list of features of the faces in the photo. From here, we can display insightful real-time analytics such as what proportion of the class is currently engaged in the content. However, since we must also persist students across different classes, we also lookup the faces to previous faces taken in the same class so teachers can view useful information about any student across an arbitrary period of time, rather than just their instantaneous status. This cross-checking is also how the software can take attendance. On the back-end, Hasura is providing authentication for both teachers and students, and the student portal's chatbot is once again powered by Microsoft's Azure Bot Service.

Challenges we ran into:
One particular difficulty we encountered was discovering the correct conditions to mark someone as "disengaged". We had to modify a lot of different weights and values in order to not have a too stringent criteria for engagement, while at the same time ensuring that distracted students were properly marked down.

What we're proud of:
We're very proud of incorporating Microsoft's newest API into our project. Since it was only released recently, there was little documentation or help provided outside of the official documents, so we were very happy to see at one point our algorithm successfully identifying a face it had seen before. We're also proud of our design - we strove to create clean, intuitive interfaces that didn't get in the way of the true functionality.

What we learned:
We learned a lot about the power of vision-related APIs at this hackathon. While we didn't use every bit of information provided by Microsoft's service, we feel it could be very well utilized in other projects. For example, analysis of human intention on the road using facial recognition to predict road rage could greatly increase the safety of our society.

What's next for Watchdog
We feel this platform definitely has a lot of room to grow. As classrooms become more and more technology-oriented, it isn't a stretch to imagine every classroom being equipped with a wide-angle lens at the front of the room taking attendance and tracking engagement across large periods of time. And even more importantly, the technology powering the platform - computer vision - definitely has infinite room to grow, even if Watchdog doesn't. We feel our experience at MHacks greatly prepared us for what will surely be a future filled with technology seeing and understanding the world much like we do.
