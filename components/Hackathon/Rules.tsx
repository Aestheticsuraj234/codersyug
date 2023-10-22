import React from 'react'

import { Crown, PenSquare, FileQuestion, Trophy, WheatOff, Activity, Link2, HelpingHand, Scale, LogOut, Lock } from 'lucide-react'

const Rules = () => {
    const FeatureItems = [
        {
            "id": 1,
            "title": "Eligibility",
            "description": "The quiz is open to all students with knowledge of coding, regardless of age, location, or educational level.",
            "icon": (<Crown size={35} className='text-cyan-400' />)
        },
        {
            "id": 2,
            "title": "Registration",
            "description": "Registration is Absolutely free; anyone interested in participating can play the quiz",
            "icon": (<PenSquare size={35} className='text-yellow-400' />)
        },
        {
            "id": 3,
            "title": " Quiz Structure",
            "description": "The quiz consists of 10 sets of questions, with one set to be played each day. Participants are expected to complete one set per day within the specified time frame.",
            "icon": (<FileQuestion size={35} className='text-indigo-400' />)
        },
        {
            "id": 4,
            "title": " Leaderboard and Winner Selection",
            "description": "The leaderboard will display participants' scores, which will determine the winners. The participant with the highest cumulative score at the end of the 10 days will be declared the winner",
            "icon": (<Trophy size={35} className='text-red-400' />)
        },
        {
            "id": 5,
            "title": "Cheating and Fair Play:",
            "description": "Cheating is strictly prohibited.  Participants found to be cheating, including using unauthorized resources or getting help from others, will be disqualified from the quiz. If a participant's entry is terminated for cheating, their previous scores will be removed from the leaderboard.",
            "icon": (<WheatOff size={35} className={"text-pink-400"} />)
        },
        {
            "id": 6,
            "title": "Communication",
            "description": "If you have any doubts or confusion you can message us on Instagram or drop an email",
            "icon": (<Activity size={35} className='text-green-400' />)
        },
        {
            "id": 7,
            "title": "Code of Conduct",
            "description": "Participants are expected to exhibit good sportsmanship and respect for others. Harassment, offensive behavior, or disruptive conduct will not be tolerated",
            "icon": (<Link2 size={35} className='text-black dark:text-white' />)
        },
        {
            "id": 8,
            "title": "Dispute Resolution",
            "description": "If participants have concerns or disputes, they should reach out to the organizers through the designated communication channel.",
            "icon": (<HelpingHand size={35} className='text-blue-400' />)
        },
        {
            "id": 9,
            "title": "Rule Changes",
            "description": "The organizers reserve the right to modify the rules if necessary, with advance notice to participants.",
            "icon": (<Scale size={35} className='text-purple-400' />)
        },
        {
            "id": 10,
            "title": "Termination of Event",
            "description": "The organizers may terminate or postpone the quiz under unforeseen circumstances, with notice provided to participants.",
            "icon": (<LogOut size={35} className='text-red-400' />)
        },
        {
            "id": 11,
            "title": "Privacy and Data Protection",
            "description": "Participant data will be handled in accordance with data protection regulations",
            "icon": (<Lock size={35} className='text-cyan-200' />)
        },
    ]

    return (
        <section id="rules" className="glassmorphism flex w-[100%]  flex-col p-4 mt-12 rounded-lg max-w-full ">
            <h4 className="items-center justify-center uppercase flex text-center font-bold text-md   ">Let's make our hackathon successful👑!</h4>
            <h1 className="items-center justify-center flex text-center mt-9 font-extrabold md:text-4xl text-3xl  bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-yellow-300 dark:to-green-600">Rules to Attempt Quiz</h1>
            <div className="grid md:grid-cols-2 gird-cols-1 gap-4 mt-12">
                {FeatureItems.map((item) => (
                    <div key={item.id} className="p-4 rounded-lg ">
                        <h3 className="text-xl font-bold flex flex-row justify-start  dark:bg-gradient-to-r from-yellow-300 to-green-600 items-center dark:bg-clip-text dark:text-transparent md:text-left gap-3">
                            {item.icon}
                            {item.title}
                        </h3>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{item.description}</p>
                    </div>
                ))
            }
        </div>
    </section>
)}

export default Rules;
