import React from 'react';

export default function Feature({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {icon}
      <p className="font-medium">{title}</p>
    </div>
  );
}
