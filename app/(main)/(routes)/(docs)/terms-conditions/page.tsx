import React from 'react';

const TermsAndConditions = () => {
  const TermsandConditions = [
    {
      section: '1. Acceptance of Terms',
      points: [
        'By accessing or using codersyug, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using the Platform.',
      ]
    },
    {
      section: '2. User Registration',
      points: [
        // Add points for this section as needed
        "2.1. Account Creation: To access certain features of codersyug, you may be required to create an account. You are responsible for providing accurate and up-to-date information during the registration process.",
        "2.2. Account Security: You are responsible for maintaining the security of your account credentials. codersyug is not liable for any unauthorized access to your account.",

       
      ]
    },
    {
      section: '3. User Conduct',
      points: [
        // Add points for this section as needed
        "3.1. Compliance: You agree to use codersyug in compliance with all applicable laws and regulations. You are responsible for your interactions and contributions on the Platform.",
        "3.2. Content Contributions: If you contribute content to the Platform, including articles, tutorials, comments, or any other materials, you grant codersyug a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content.",
        "3.3. Prohibited Activities: You are prohibited from engaging in activities that may:",
        "3.3.1. Violate any applicable laws or regulations.",
        "3.3.2. Infringe upon the intellectual property rights of others.",
        "3.3.3. Impersonate another individual or entity.",
        "3.3.4. Harass, threaten, or defame others.",
        "3.3.5. Violate the privacy of others.",
        "3.3.6. Be obscene, vulgar, or offensive.",
        "3.3.7. Be used for any illegal or unauthorized purpose.",
        "3.3.8. Contain any viruses, malware, or other malicious code.",
        "3.3.9. Interfere with the operation of the Platform.",
        "3.3.10. Attempt to gain unauthorized access to the Platform.",
        "3.3.11. Engage in any other activity that may be deemed objectionable.",
        "3.4. Enforcement: We reserve the right to remove any content that violates these Terms and Conditions. We also reserve the right to suspend or terminate your account if you engage in any prohibited activities.",
        "3.5. Third-Party Content: codersyug may contain links to third-party websites, applications, or services. We do not endorse or assume any responsibility for any such third-party content.",
        "3.6. Disclaimer: codersyug is not responsible for any loss or damage resulting from your use of the Platform. We make no warranties or guarantees of any kind, whether express or implied.",

      ]
    },
    {
      section: '4. Privacy Policy',
      points: [
        // Add points for this section as needed
        "Your use of codersyug is also governed by our Privacy Policy. By using the Platform, you consent to the collection and use of your personal information as described in the Privacy Policy."
      ]
    },
    {
      section: '5. Mentorship Programs',
      points: [
        // Add points for this section as needed
        "5.1. Mentorship Relationships: codersyug facilitates mentorship programs where mentors provide guidance and advice to mentees. The Platform does not guarantee the success of any mentorship relationship.",
        "5.2. Responsibility: Mentors and mentees are responsible for their interactions and agreements. codersyug is not liable for any issues that may arise from mentorship programs.",
       
      ]
    },
    {
      section: '6. E-Book Store',
      points: [
        // Add points for this section as needed
        "6.1. Purchases: codersyug offers an e-book store where users can purchase or rent e-books and study materials. Transactions are subject to terms and conditions set by third-party providers.",
        "6.2. Refunds: Refund policies for e-books and study materials are determined by the respective providers. codersyug is not responsible for refund requests."
      ]
    },
    {
      section: '7. Gamification',
      points: [
        // Add points for this section as needed
        "7.1. Badges and Rewards: Users can earn badges, points, and rewards for their engagement and achievements on the Platform. These rewards are for entertainment and engagement purposes and do not hold any monetary value.",
      
      ]
    },
    {
      section: '8. Changes to Terms and Conditions',
      points: [
        // Add points for this section as needed
        "codersyug reserves the right to update or modify these Terms and Conditions at any time. Any changes will be communicated through the Platform, and it is your responsibility to review the updated terms. Continued use of the Platform after changes constitutes your acceptance of the revised terms.",
      
      ]
    },
    {
      section: '9. Contact Us',
      points: [
        // Add points for this section as needed
        "For inquiries, concerns, or requests related to these Terms and Conditions, please contact us at [SIGMADEV234@GMAIL.COM].",
      
      ]
    }
  ];

  return (
    <div>
      <div className='flex-center paddings mx-auto w-full max-w-screen-2xl flex-col mt-10 h-full'>
        <p className='text-2xl font-bold dark:text-zinc-400 text-zinc-600 px-2 py-2.5 border-dashed border-2 dark:border-zinc-400 border-zinc-600 rounded-md mb-10'>CodersYug</p>
        <h1 className='sm:heading1 heading2 mb-6 text-center bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent'>CodersYug Terms and Conditions</h1>
        <span className='text-white-400'>Last updated: 4 Oct, 2023</span>
        <p className='base-regular text-center py-6 text-zinc-700 dark:text-zinc-400'>
        Welcome to codersyug, an all-in-one platform dedicated to empowering computer science students on their educational journey and career path. These Terms and Conditions govern your use of codersyug (hereinafter referred to as "the Platform"), and by accessing or using our services, you agree to comply with and be bound by these terms. Please read them carefully.
        </p>
      </div>
      {TermsandConditions.map((sectionData, index) => (
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
      By using codersyug, you agree to abide by these Terms and Conditions. Your continued use of the Platform signifies your acceptance of any modifications or amendments to these terms..
      </p>
    </div>
  );
}

export default TermsAndConditions;
