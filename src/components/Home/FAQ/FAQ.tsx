import React from "react";

export default function FAQ() {
  const faqs1 = [
    {
      question: "What is an e-learning platform?",
      answer:
        "An e-learning platform is a web-based system that allows users to access educational content and participate in learning activities online. It offers courses, materials, assessments, and interactive tools to facilitate learning from anywhere at any time.",
    },
    {
      question: "How do I sign up for a course?",
      answer:
        "To sign up for a course, first create an account on our platform. Once registered, browse through our course catalog, select the course you are interested in, and click on the 'Enroll' button. Follow the prompts to complete your enrollment.",
    },
    {
      question: "Are the courses self-paced or scheduled?",
      answer:
        "Our platform offers both self-paced and scheduled courses. Self-paced courses allow you to learn at your own speed, while scheduled courses have specific start and end dates with set times for lectures and assignments. You can choose the type that best fits your learning style.",
    },
  ];

  const faqs2 = [
    {
      question: "What types of courses are available?",
      answer:
        "We offer a wide range of courses across various subjects, including web development, data science, design, languages, business, health & fitness, and more. Each course is designed by experts to provide a comprehensive learning experience.",
    },
    {
      question: "Do I receive a certificate after completing a course?",
      answer:
        "Yes, upon successfully completing a course, you will receive a digital certificate of completion. This certificate can be downloaded, shared, and added to your resume or LinkedIn profile to showcase your achievement.",
    },
    {
      question:
        "What if I have technical difficulties while using the platform?",
      answer:
        "If you encounter any technical difficulties, please contact our support team through the 'Help' section of the platform. We offer 24/7 support to assist you with any issues you may face, ensuring a smooth learning experience.",
    },
  ];

  return (
    <section id="faq" className="faq section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Frequently Asked Questions</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div className="faq-container">
              {faqs1.map((faq) => (
                <div key={faq.question} className="faq-item">
                  <h3>{faq.question}</h3>
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
                  <i className="faq-toggle bi bi-chevron-right"></i>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div className="faq-container">
              {faqs2.map((faq) => (
                <div key={faq.question} className="faq-item">
                  <h3>{faq.question} </h3>
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
                  <i className="faq-toggle bi bi-chevron-right"></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
