import React from 'react';

export const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
export const Card = ({ children }) => <div className="border p-4 rounded-lg shadow-md">{children}</div>;
export const CardContent = ({ children }) => <div className="mt-2">{children}</div>;
export const CardDescription = ({ children }) => <p className="text-sm text-gray-500">{children}</p>;
export const CardFooter = ({ children }) => <div className="mt-4 flex justify-end">{children}</div>;
export const CardHeader = ({ children }) => <div className="mb-2">{children}</div>;
export const CardTitle = ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>;
export const Tabs = ({ children }) => <div className="mb-4">{children}</div>;
export const TabsContent = ({ children, value }) => <div role="tabpanel" hidden={value !== value}>{children}</div>;
export const TabsList = ({ children }) => <div className="flex border-b">{children}</div>;
export const TabsTrigger = ({ children, value, ...props }) => (
  <button className="px-4 py-2 border-b-2 border-transparent hover:border-gray-300" {...props}>{children}</button>
);
export const ScrollArea = ({ children }) => <div className="overflow-auto max-h-96">{children}</div>;
export const Alert = ({ children, variant }) => (
  <div className={`p-4 rounded-lg ${variant === 'destructive' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
    {children}
  </div>
);
export const AlertDescription = ({ children }) => <p className="text-sm">{children}</p>;
export const AlertTitle = ({ children }) => <h4 className="font-semibold mb-1">{children}</h4>;