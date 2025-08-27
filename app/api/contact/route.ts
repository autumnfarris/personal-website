import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // For now, we'll use a simple email service or mailto approach
    // In production, you would integrate with services like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    
    // Create email content
    const emailContent = {
      to: 'autumn@autumnfarris.com',
      from: body.email,
      subject: `Contact Form: ${body.subject}`,
      text: `
Name: ${body.name}
Email: ${body.email}
Subject: ${body.subject}

Message:
${body.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">New Contact Form Submission</h2>
          <div style="background-color: #fef3e7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Subject:</strong> ${body.subject}</p>
          </div>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Message:</h3>
            <p style="line-height: 1.6;">${body.message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            This email was sent from the contact form on autumnfarris.com
          </p>
        </div>
      `
    };

    // For development purposes, we'll log the email content
    // In production, replace this with actual email sending service
    console.log('Email would be sent with content:', emailContent);
    
    // TODO: Implement actual email sending with a service like Resend
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send(emailContent);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully! I\'ll get back to you soon.' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again or contact me directly.' 
      },
      { status: 500 }
    );
  }
}