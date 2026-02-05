"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is FlexVest?",
    answer:
      "FlexVest is a digital savings platform that allows you to save in USDC, a stablecoin pegged to the US Dollar, protecting your money from Naira inflation and devaluation.",
  },
  {
    question: "Is FlexVest safe?",
    answer:
      "Yes. Your funds remain in your self-custody wallet. FlexVest uses blockchain technology on Solana for secure and transparent transactions.",
  },
  {
    question: "How do I start saving?",
    answer:
      "Simply create an account, deposit Naira, and convert it to USDC. You can then set savings goals and track your progress in real time.",
  },
  {
    question: "What are the fees?",
    answer:
      "FlexVest charges only a 0.5% withdrawal fee. Deposits are free, and there are no hidden costs.",
  },
  {
    question: "Can I withdraw anytime?",
    answer:
      "Yes! FlexVest gives you 24/7 access to your funds, so you can withdraw anytime, anywhere.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (i: number) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <section
      className="px-4 py-16 max-w-3xl mx-auto"
      id="faqs"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          Everything you need to know about saving with{" "}
          <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            FlexVest
          </span>
          . Can’t find what you’re looking for?{" "}
          <a
            href="https://x.com/Jesse_can_code"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Contact our team
          </a>
          .
        </p>
      </div>

      {/* FAQ Items */}
      <div className="flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`bg-white rounded-xl shadow-md p-5 cursor-pointer transition-all duration-300 ${
              activeIndex === i ? "border-2 border-purple-600" : ""
            }`}
            onClick={() => toggleFAQ(i)}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-gray-900 font-semibold text-lg">{faq.question}</h4>
              {activeIndex === i ? (
                <Minus className="text-purple-600 transition-transform" size={22} />
              ) : (
                <Plus className="text-purple-600 transition-transform" size={22} />
              )}
            </div> 

            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden mt-3 text-gray-700 text-sm md:text-base"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
