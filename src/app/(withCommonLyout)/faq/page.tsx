'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus} from 'lucide-react';

const faqs = [
  {
    question: 'How do I apply to become a tutor?',
    answer:
      "Simply click on the 'Apply Now' button, fill out your profile with your expertise, and submit your certifications. Our team will review your application within 24-48 hours.",
  },
  {
    question: 'What are the fees for using the platform?',
    answer:
      "We believe in transparency. For our base plan, we don't take any commission from your earnings. There is a small monthly subscription fee to access premium tools. And we have lot of tools.",
  },
  {
    question: 'How do I receive payments?',
    answer:
      'Payments are automatically processed through our secure gateway. Once a session is completed, funds are transferred to your connected bank account or digital wallet instantly.',
  },
  {
    question: 'Can I set my own schedule?',
    answer:
      'Yes! You have full control over your calendar. You can set your available hours, block out holidays, and even set buffer times between sessions.',
  },
  {
    question: 'Is there a limit on how many students I can teach?',
    answer:
      'No limits at all. Whether you want to teach one student or run large group classes, our infrastructure scales with your needs.',
  },
];

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className=" bg-secondary">
      {/* --- HEADER SECTION --- */}
      <section className="py-8">
        <div className="container-max px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">
              Faq & <span className="text-[#2596be]">Query</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* --- FAQ ACCORDION SECTION --- */}
      <section className="container-max px-6 pb-10">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)]"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors hover:bg-slate-50/50"
              >
                <span
                  className={`font-bold text-base md:text-lg transition-colors ${activeIndex === index ? 'text-[#2596be]' : 'text-slate-800'}`}
                >
                  {faq.question}
                </span>
                <div
                  className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-[#2596be] text-white rotate-180' : 'bg-slate-100 text-slate-500'}`}
                >
                  {activeIndex === index ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
