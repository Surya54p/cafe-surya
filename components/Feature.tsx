import React from 'react';

export default function Feature({ title, icon, description }: { title: string; icon?: React.ReactNode, description?: string }) {
  return (
    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col gap-2">
      <div className="flex items-start my-3">
        {icon}
      </div>
      <div className="text-start">
        <p className="font-medium">{title}</p>
        <p className="text-sm  text-gray-500">{description}</p>
      </div>
    </div>
  );
}
