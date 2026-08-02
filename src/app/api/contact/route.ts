import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Basic email regex for backend validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, message, topic, productId } = body;

    // 1. Server-side Validation (Task C)
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { error: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message content is required.' },
        { status: 400 }
      );
    }

    // 2. Initialize Supabase Client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing.');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Supabase Insertion (Task B)
    const { data, error } = await supabase
      .from('contact_enquiries')
      .insert([
        {
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          topic: topic || 'general',
          product_id: productId || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Database insertion error:', error);
      return NextResponse.json(
        { error: 'Failed to submit enquiry. Please try again later.' },
        { status: 500 }
      );
    }

    // 4. Truthful Success Response
    return NextResponse.json(
      { success: true, message: 'Enquiry submitted successfully!', data },
      { status: 201 }
    );
  } catch (err) {
    console.error('Unexpected contact route error:', err);
    return NextResponse.json(
      { error: 'Invalid request data or server error.' },
      { status: 400 }
    );
  }
}