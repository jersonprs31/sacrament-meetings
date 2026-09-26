'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeeting, deleteMeeting } from './meetings-db';
import type { SacramentMeeting } from './types';

const MeetingFormSchema = z.object({
  date: z.string().min(1, { message: 'Date is required.' }),
  meetingType: z.string().min(1, { message: 'Meeting type is required.' }),
  presiding: z.string().min(1, { message: 'Presiding authority is required.' }),
  conducting: z.string().min(1, { message: 'Conducting authority is required.' }),
  announcements: z.string().optional(),
  openingHymn: z.string().optional(),
  openingPrayer: z.string().optional(),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.string().optional(),
  sacramentHymn: z.string().optional(),
  speakers: z.string().optional(),
  closingHymn: z.string().optional(),
  closingPrayer: z.string().optional(),
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymn?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymn?: string[];
    speakers?: string[];
    closingHymn?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: formData.get('announcements'),
    openingHymn: formData.get('openingHymn'),
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: formData.get('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness'),
    sacramentHymn: formData.get('sacramentHymn'),
    speakers: formData.get('speakers'),
    closingHymn: formData.get('closingHymn'),
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Meeting.',
    };
  }

  try {
    await addMeeting(validatedFields.data as unknown as Omit<SacramentMeeting, 'id'>);
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function editMeeting(id: number, prevState: State, formData: FormData): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: formData.get('announcements'),
    openingHymn: formData.get('openingHymn'),
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: formData.get('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness'),
    sacramentHymn: formData.get('sacramentHymn'),
    speakers: formData.get('speakers'),
    closingHymn: formData.get('closingHymn'),
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Meeting.',
    };
  }

  try {
    await updateMeeting(id, validatedFields.data as unknown as Partial<SacramentMeeting>);
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeetingAction(id: number) {
  try {
    await deleteMeeting(id);
    revalidatePath('/meetings');
  } catch (error) {
    console.error(error);
    throw new Error('Database Error: Failed to Delete Meeting.');
  }
}