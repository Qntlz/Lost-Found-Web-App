"use client";

import clsx from "clsx";
import React, { useState, useCallback, useEffect } from "react";

export default function DataCounter({ count, title }: { count: number, title: string }) {
  const [number, setNumber] = useState(0);

  const increment = useCallback(() => {
    const counter = (length = 2000) => {
      setNumber(0);
      let n = count;
      let start = Date.now();
      let end = start + length;
      let interval = length / n;
      const sInt = setInterval(() => {
        let time = Date.now();
        if (time < end) {
          let count = Math.floor((time - start) / interval);
          setNumber(count);
        } else {
          setNumber(n);
          clearInterval(sInt);
        }
      }, interval);
    };

    counter();
  }, [count]);

  useEffect(() => {
    increment();
  }, [increment]);

  return (
    <div className="flex flex-col items-center justify-center text-center my-3 flex-wrap text-lg font-semibold transition ease-in delay-50 hover:-translate-y-1 hover:scale-110 duration-300">
      <span className={clsx(
        {
          'text-blue-500' : `${title}` === 'Total Post',
          'text-green-500' : `${title}` === 'Marked as Found',
          'text-red-500' : `${title}` === 'Marked as Lost',
          'text-slate-500' : `${title}` === 'Total Views',
          
        }
      )}>{number}</span>
      <p className="text-base font-medium text-black">{title}</p>
    </div>
  );
}
