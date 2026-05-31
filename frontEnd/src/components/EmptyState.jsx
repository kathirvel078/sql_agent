import React from 'react';
import { Database, Zap, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-card border border-border p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow duration-300"
  >
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <Icon size={20} />
    </div>
    <h3 className="font-semibold text-foreground text-[15px]">{title}</h3>
    <p className="text-[13px] text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

const EmptyState = ({ onExampleClick }) => {
  const examples = [
    "Show all employees in the IT department",
    "What was the total revenue last quarter?",
    "List the top 5 selling products",
    "Count the number of active users"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary rotate-3"
      >
        <Database size={40} className="-rotate-3" />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center tracking-tight"
      >
        SQL Database Agent
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-muted-foreground text-center max-w-md mb-10 text-[15px]"
      >
        Ask questions in natural language and get insights from your database instantly.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10">
        <FeatureCard 
          icon={Zap} 
          title="Fast Queries" 
          description="Get answers in seconds without writing complex SQL." 
          delay={0.3} 
        />
        <FeatureCard 
          icon={Shield} 
          title="Secure" 
          description="Read-only access ensures your database remains safe." 
          delay={0.4} 
        />
        <FeatureCard 
          icon={Sparkles} 
          title="AI Powered" 
          description="Powered by advanced language models for accurate SQL generation." 
          delay={0.5} 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full flex flex-col items-center"
      >
        <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider text-[11px]">Try asking about</p>
        <div className="flex flex-wrap justify-center gap-2">
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => onExampleClick(example)}
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-xl text-[13px] font-medium transition-colors border border-border/50"
            >
              "{example}"
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyState;
