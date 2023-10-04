import React from 'react';

const PrivacyPolicy = () => {
  const PrivacyPolicyData = [
    {
      section: '1. Information Collection',
      points: [
        '1.1. Account Information - During your registration on CodersYug, we collect essential information, such as your username, email address, and password, to establish and fortify your account.',
        '1.2. Profile Information - We offer you the choice to provide supplementary information in your user profile, including your name, profile image, educational institution, and other optional particulars.',
        '1.3. Blog Contributions - Should you decide to contribute articles or content to our community-driven blog, we gather and retain the content you submit, in conjunction with any associated metadata.',
        '1.4. Mentorship Programs - Participation in our mentorship programs necessitates the collection of data pertaining to your interests, objectives, and interactions with mentors and mentees.',
        '1.5. E-Book Purchases - Transactions conducted within our e-book store prompt the collection of transactional details, encompassing payment information and your acquisition history.',
        '1.6. Handwritten Notes - In the event you upload handwritten notes and study materials, we collect and archive the content you furnish.',
        '1.7. Mock Tests and Practice Exams - Your performance data is logged and retained when you undertake mock tests, practice examinations, and quizzes on our platform.',
        '1.8. AI-Powered Coding Teacher - Data stemming from your interactions with our AI coding teacher, including coding exercises, feedback, and progress tracking, is assembled and utilized to enhance your learning experience.',
        '1.9. Online Study Groups - Joining or founding online study groups results in the accumulation of information regarding your group affiliations, interactions, and shared content within these groups.',
        '1.10. AI-Powered Skill Assessment - Data arising from skill assessments, including coding challenges and technical skill evaluations, is compiled to furnish you with personalized learning recommendations.',
        '1.11. Personalized Learning Paths - Information concerning your learning objectives and progress is employed to create and update personalized learning paths.'
      ]
    },
    {
      section: '2. Utilization of Your Information',
      points: [
        // Add points for this section as needed
        "To administer and enhance the services offered on the Platform.",
        "To personalize your learning journey by providing customized content and recommendations.",
        "To facilitate communication within mentorship programs and study groups.",
        "To process transactions and deliver purchased e-books and services.",
        "To engage in research, analytics, and enhance the quality of our services.",
        "To communicate updates, newsletters, and notifications pertaining to your account and the Platform.",
      ]
    },
    {
      section: '3. Sharing of Information',
      points: [
        // Add points for this section as needed
        "With mentors and mentees in our mentorship programs, as deemed necessary for program engagement.",
        "With other users within online study groups to enable collaboration and communication.",
        "With third-party service providers who assist us in delivering our services.",
        "With third-party payment processors to process transactions conducted on the Platform.",
        "With your explicit consent or as mandated by applicable laws and regulations."
      ]
    },
    {
      section: '4. Data Security',
      points: [
        // Add points for this section as needed
        "Our commitment to safeguarding your data is unwavering. We have implemented rigorous technical and organizational measures to protect your information against unauthorized access, disclosure, alteration, or destruction."
      ]
    },
    {
      section: '5. Your Choices',
      points: [
        // Add points for this section as needed
        "Update and revise your profile information.",
        "Opt-out of receiving marketing communications.",
        "Request the deletion of your account and associated data."
      ]
    },
    {
      section: '6. Changes to this Privacy Policy',
      points: [
        // Add points for this section as needed
        "We may periodically update this Privacy Policy to accommodate changes in our practices or to adhere to legal and regulatory requirements. Such changes will be denoted by a revised `Effective Date` at the commencement of this policy. We strongly encourage you to periodically review this document."
      ]
    },
    {
      section: '7. Contact Us',
      points: [
        // Add points for this section as needed
        "For any inquiries, concerns, or requests regarding this Privacy Policy or your personal data on CodersYug, please feel free to contact us at sigmadev234@gmail.com",
      
      ]
    }
  ];

  return (
    <div>
      <div className='flex-center paddings mx-auto w-full max-w-screen-2xl flex-col mt-10 h-full'>
        <p className='text-2xl font-bold dark:text-zinc-400 text-zinc-600 px-2 py-2.5 border-dashed border-2 dark:border-zinc-400 border-zinc-600 rounded-md mb-10'>CodersYug</p>
        <h1 className='sm:heading1 heading2 mb-6 text-center bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent'>Privacy Policy</h1>
        <span className='text-white-400'>Last updated: 4 Oct, 2023</span>
        <p className='base-regular text-center py-6 text-zinc-700 dark:text-zinc-400'>
          Welcome to CodersYug, where your privacy and data protection are of utmost importance to us. This Privacy Policy articulates our commitment to safeguarding your personal information as you engage with our comprehensive computer science platform, CodersYug (hereafter referred to as "the Platform"). We urge you to carefully peruse this document to comprehend how we manage, utilize, disclose, and protect your data.
        </p>
      </div>
      {PrivacyPolicyData.map((sectionData, index) => (
        <div className='flex-start paddings mx-auto w-full max-w-screen-2xl flex-col' key={index}>
          <h2 className='heading3 x-paddings mb-7'>{sectionData.section}</h2>
          <ul className='x-paddings '>
            {sectionData.points.map((point, pointIndex) => (
              <li className='list-disc paragraph-regular text-start text-zinc-800 dark:text-zinc-400 mb-7' key={pointIndex}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
      <p className='base-regular paddings text-center py-6 text-zinc-700 dark:text-zinc-400'>
      By utilizing CodersYug, you explicitly consent to the terms elucidated in this Privacy Policy. Your continued use of the Platform signifies your acceptance of any modifications or amendments to this policy.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
