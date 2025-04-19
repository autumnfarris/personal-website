"use client";

import { useState, useEffect } from "react";

// Define the structure of a guestbook entry
interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  date: string;
}

export default function Guestbook() {
  // State for the form inputs
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  
  // State for the guestbook entries
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  // Load entries from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem("guestbookEntries");
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error("Failed to load entries from localStorage:", error);
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    try {
      if (entries.length > 0) {
        localStorage.setItem("guestbookEntries", JSON.stringify(entries));
      }
    } catch (error) {
      console.error("Failed to save entries to localStorage:", error);
    }
  }, [entries]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't add empty entries
    if (!name.trim() || !message.trim()) return;
    
    // Create a new entry
    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
    };
    
    // Add the new entry to the beginning of the list
    setEntries([newEntry, ...entries]);
    
    // Clear the form
    setName("");
    setMessage("");
  };
  
  // Clear all entries
  const handleClearEntries = () => {
    if (window.confirm("Are you sure you want to clear all entries? This cannot be undone.")) {
      setEntries([]);
      try {
        localStorage.removeItem("guestbookEntries");
      } catch (error) {
        console.error("Failed to clear entries from localStorage:", error);
      }
    }
  };

  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--accent-2)' }}>Autumn Memories</h2>
      
      {/* Form to add a new entry */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(205, 173, 93, 0.1)', border: '1px solid var(--accent-3)' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-1)' }}>Sign the Guestbook</h3>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium" style={{ color: 'var(--accent-4)' }}>
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded"
            style={{ 
              backgroundColor: 'rgba(255, 248, 240, 0.8)',
              border: '1px solid var(--accent-3)',
              outline: 'none'
            }}
            required
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="message" className="block mb-2 font-medium" style={{ color: 'var(--accent-4)' }}>
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
            className="w-full p-3 rounded min-h-24"
            style={{ 
              backgroundColor: 'rgba(255, 248, 240, 0.8)',
              border: '1px solid var(--accent-3)',
              outline: 'none'
            }}
            required
          />
        </div>
        
        <button
          type="submit"
          style={{
            backgroundColor: 'var(--accent-5)',
            color: '#FFF8F0',
            borderRadius: '9999px',
            padding: '0.5rem 1rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-4)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-5)'}
        >
          Sign Guestbook
        </button>
      </form>
      
      {/* Display entries */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <p className="text-center italic text-black/70 dark:text-white/70">
            No entries yet. Be the first to sign!
          </p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium">{entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}</h3>
              <button
                onClick={handleClearEntries}
                className="text-sm transition-colors"
                style={{ 
                  color: 'var(--accent-2)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid var(--accent-2)',
                  backgroundColor: 'transparent'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-2)';
                  e.currentTarget.style.color = '#FFF8F0';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--accent-2)';
                }}
              >
                Clear All Entries
              </button>
            </div>
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-lg"
                style={{
                  border: '1px solid var(--accent-3)',
                  backgroundColor: 'rgba(230, 167, 76, 0.05)',
                  boxShadow: '0 2px 4px rgba(116, 72, 15, 0.1)'
                }}
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold" style={{ color: 'var(--accent-4)' }}>{entry.name}</h3>
                  <span className="text-sm" style={{ color: 'var(--accent-5)' }}>
                    {formatDate(entry.date)}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{entry.message}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}