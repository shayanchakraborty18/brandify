import React, { useState } from "react";

export default function Tabs({ product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { description, features } = product;
  const selected = [
    { label: "description", content: description },
    { label: "features", content: features },
    
  ];


  return (
    <div className="container mx-auto px-4">
      <div className="flex border-b border-primary/50 gap-1">
        {selected.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 text-sm uppercase rounded-t-md bg-background font-medium border-b-2 transition-all duration-200 ${
              activeIndex === index
                ? "border-primary text-primary shadow-md"
                : "border-transparent text-text hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-6 border rounded-b-md shadow border-text/10 border-t-0 bg-white">
        {selected[activeIndex].content}
      </div>
    </div>
  );
}
