'use client';

import { useActionState } from 'react';
import { createMeeting } from '@/lib/actions';
import Link from 'next/link';

export default function CreateMeetingPage() {
  const initialState = { message: null, errors: {} };
  
  // React 19 hook to manage the form state and server action
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Meeting</h1>
      
      <form action={formAction} className="flex flex-col gap-6">
        
        {/* Date Field */}
        <div>
          <label htmlFor="date" className="block font-medium mb-1">Date</label>
          <input 
            id="date" 
            name="date" 
            type="date" 
            className="w-full border p-2 rounded"
            aria-describedby="date-error"
          />
          <div id="date-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.date && (
              <p className="text-red-500 text-sm mt-1">{state.errors.date[0]}</p>
            )}
          </div>
        </div>

        {/* Meeting Type Field */}
        <div>
          <label htmlFor="meetingType" className="block font-medium mb-1">Meeting Type</label>
          <select 
            id="meetingType" 
            name="meetingType" 
            className="w-full border p-2 rounded"
            aria-describedby="meetingType-error"
          >
            <option value="">Select a type...</option>
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
          </select>
          <div id="meetingType-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.meetingType && (
              <p className="text-red-500 text-sm mt-1">{state.errors.meetingType[0]}</p>
            )}
          </div>
        </div>

        {/* Presiding Authority Field */}
        <div>
          <label htmlFor="presiding" className="block font-medium mb-1">Presiding</label>
          <input 
            id="presiding" 
            name="presiding" 
            type="text" 
            placeholder="e.g., Bishop Thompson"
            className="w-full border p-2 rounded"
            aria-describedby="presiding-error"
          />
          <div id="presiding-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.presiding && (
              <p className="text-red-500 text-sm mt-1">{state.errors.presiding[0]}</p>
            )}
          </div>
        </div>

        {/* Conducting Authority Field */}
        <div>
          <label htmlFor="conducting" className="block font-medium mb-1">Conducting</label>
          <input 
            id="conducting" 
            name="conducting" 
            type="text" 
            placeholder="e.g., Brother Nakamura"
            className="w-full border p-2 rounded"
            aria-describedby="conducting-error"
          />
          <div id="conducting-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.conducting && (
              <p className="text-red-500 text-sm mt-1">{state.errors.conducting[0]}</p>
            )}
          </div>
        </div>

        {/* General Form Error */}
        {state?.message && (
          <p className="text-red-500 font-medium">{state.message}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <Link 
            href="/meetings" 
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Create Meeting'}
          </button>
        </div>
      </form>
    </main>
  );
}