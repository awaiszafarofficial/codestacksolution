import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type ConsultationPayload = {
  type: "consultation";
  name: string;
  email: string;
  message: string;
};

export type ServiceInquiryPayload = {
  type: "service-inquiry";
  name: string;
  email: string;
  service: string;
  resources: string;
  experience: string;
  projectDetail: string;
};

export type FormEmailPayload = ConsultationPayload | ServiceInquiryPayload;

const RECIPIENT_EMAIL = import.meta.env.DEV
  ? "awaiszafarofficial@gmail.com"
  : "codestacksolution@gmail.com";

const getErrorMessage = async (error: unknown) => {
  if (error instanceof FunctionsHttpError) {
    try {
      const body = await error.context.json();
      if (body?.error) return String(body.error);
    } catch {
      // Fall back to the default error message below.
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};

const buildFormSubmitBody = (payload: FormEmailPayload) => {
  if (payload.type === "consultation") {
    return {
      name: payload.name,
      email: payload.email,
      message: payload.message,
      _subject: `New Consultation Request from ${payload.name}`,
      _replyto: payload.email,
      _template: "table",
      _captcha: "false",
    };
  }

  return {
    name: payload.name,
    email: payload.email,
    service: payload.service,
    resources: payload.resources,
    experience: `${payload.experience} years`,
    message: payload.projectDetail,
    _subject: `Service Inquiry: ${payload.service}`,
    _replyto: payload.email,
    _template: "table",
    _captcha: "false",
  };
};

const submitViaSupabase = async (payload: FormEmailPayload) => {
  const { data, error } = await supabase.functions.invoke("send-email", {
    body: payload,
  });

  if (error) {
    throw new Error(await getErrorMessage(error));
  }

  if (data && typeof data === "object" && "error" in data && data.error) {
    throw new Error(String(data.error));
  }

  return data;
};

const submitViaFormSubmit = async (payload: FormEmailPayload) => {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(buildFormSubmitBody(payload)),
  });

  let data: { success?: string; message?: string } = {};

  try {
    data = await response.json();
  } catch {
    // FormSubmit occasionally returns non-JSON error bodies.
  }

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to send your message. Please try again.");
  }

  return data;
};

export const submitFormEmail = async (payload: FormEmailPayload) => {
  if (import.meta.env.DEV) {
    return submitViaFormSubmit(payload);
  }

  try {
    return await submitViaSupabase(payload);
  } catch (error) {
    console.warn("Supabase email delivery unavailable, using FormSubmit fallback:", error);
    return submitViaFormSubmit(payload);
  }
};
