'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeeting, deleteMeeting } from './meetings-db';
import type { SacramentMeeting } from './types';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from '@/auth';

const HymnSchema = z.object({
  number: z.number(),
  title: z.string(),
});

const MeetingFormSchema = z.object({
  date: z.string().min(1, { message: 'Date is required.' }),

  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
    message: 'Meeting type is required.',
  }),

  presiding: z.string().min(1, {
    message: 'Presiding authority is required.',
  }),

  conducting: z.string().min(1, {
    message: 'Conducting authority is required.',
  }),

  announcements: z.array(z.string()).default([]),

  openingHymn: HymnSchema.default({
    number: 0,
    title: '',
  }),

  openingPrayer: z.string().default(''),

  wardBusiness: z
    .array(
      z.object({
        description: z.string(),
      })
    )
    .default([]),

  stakeBusiness: z.boolean().default(false),

  sacramentHymn: HymnSchema.default({
    number: 0,
    title: '',
  }),

  speakers: z
    .array(
      z.object({
        name: z.string(),
        topic: z.string(),
        type: z.enum(['speaker', 'musical-number']),
      })
    )
    .default([]),

  closingHymn: HymnSchema.default({
    number: 0,
    title: '',
  }),

  closingPrayer: z.string().default(''),
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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Correo o contraseña incorrectos.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}

export async function requireOwnerSession() {
  const session = await auth();
  if (!session?.user) throw new Error('No autenticado');
  return session;
}

function getMeetingFormData(formData: FormData) {
  return {
    date: String(formData.get('date') ?? ''),
    meetingType: String(formData.get('meetingType') ?? ''),
    presiding: String(formData.get('presiding') ?? ''),
    conducting: String(formData.get('conducting') ?? ''),
    announcements: [],
    openingHymn: {
      number: 0,
      title: '',
    },
    openingPrayer: '',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 0,
      title: '',
    },
    speakers: [],
    closingHymn: {
      number: 0,
      title: '',
    },
    closingPrayer: '',
  };
}

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  await requireOwnerSession();

  const validatedFields = MeetingFormSchema.safeParse(
    getMeetingFormData(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Meeting.',
    };
  }

  try {
    await addMeeting(
      validatedFields.data as Omit<SacramentMeeting, 'id'>
    );
  } catch (error) {
    return {
      message: `Database Error: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function editMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  await requireOwnerSession();

  const validatedFields = MeetingFormSchema.safeParse(
    getMeetingFormData(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Meeting.',
    };
  }

  try {
    await updateMeeting(
      id,
      validatedFields.data as Partial<SacramentMeeting>
    );
  } catch (error) {
    return {
      message: `Database Error: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeetingAction(id: number) {
  await requireOwnerSession();

  try {
    await deleteMeeting(id);
    revalidatePath('/meetings');
  } catch (error) {
    throw new Error('Database Error: Failed to Delete Meeting.');
  }
}