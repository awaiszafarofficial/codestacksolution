const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RECIPIENT_EMAIL = Deno.env.get('RECIPIENT_EMAIL') ?? 'codestacksolution@gmail.com';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'CodeStack <onboarding@resend.dev>';

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const isValidEmail = (value: unknown) =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, service, resources, experience, projectDetail, type } = await req.json();

    const trimmedName = String(name ?? '').trim();
    const trimmedEmail = String(email ?? '').trim();

    if (!trimmedName || !isValidEmail(trimmedEmail)) {
      return jsonResponse({ error: 'Please provide a valid name and email address.' }, 400);
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      return jsonResponse({ error: 'Email service is not configured.' }, 500);
    }

    let subject: string;
    let htmlBody: string;

    if (type === 'service-inquiry') {
      const trimmedDetail = String(projectDetail ?? '').trim();
      if (!trimmedDetail || !service || !resources) {
        return jsonResponse({ error: 'Please complete all required inquiry fields.' }, 400);
      }

      subject = `Service Inquiry: ${escapeHtml(service)}`;
      htmlBody = `
        <h2>New Service Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Resources Needed:</strong> ${escapeHtml(resources)}</p>
        <p><strong>Years of Experience:</strong> ${escapeHtml(experience)}</p>
        <h3>Project Details:</h3>
        <p>${escapeHtml(trimmedDetail)}</p>
      `;
    } else {
      const trimmedMessage = String(message ?? '').trim();
      if (!trimmedMessage) {
        return jsonResponse({ error: 'Please enter your message.' }, 400);
      }

      subject = `New Consultation Request from ${trimmedName}`;
      htmlBody = `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <h3>Message:</h3>
        <p>${escapeHtml(trimmedMessage)}</p>
      `;
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [RECIPIENT_EMAIL],
        subject,
        html: htmlBody,
        reply_to: trimmedEmail,
      }),
    });

    const responseText = await res.text();
    const data = responseText ? JSON.parse(responseText) : {};

    if (!res.ok) {
      console.error('Resend error:', data);
      const providerMessage = data?.message || data?.error || 'Email provider rejected the request.';
      return jsonResponse({ error: providerMessage, providerStatus: res.status }, res.status);
    }

    return jsonResponse({ success: true, id: data.id });
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: error.message || 'Unable to send email.' }, 500);
  }
});
