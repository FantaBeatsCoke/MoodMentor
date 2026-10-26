import {hasSafetySignal, localDecision, RESPONSE_IDS} from './responsePolicy';

const URL = process.env.EXPO_PUBLIC_MOODMENTOR_API_URL || '';
export const aiAvailable = Boolean(URL);
export async function analyzeStudentMessage(message, enabled) {
  // Safety rule runs locally, including when the network is offline.
  if (hasSafetySignal(message)) return {responseId:'SAFETY_01', source:'safety'};
  if (!enabled || !URL) return localDecision(message);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);
  try {
    const r = await fetch(`${URL.replace(/\/$/,'')}/classify`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:message.slice(0,1500)}), signal:controller.signal,
    });
    if (!r.ok) throw Error(`HTTP ${r.status}`);
    const value = await r.json();
    if (!value || !RESPONSE_IDS.includes(value.responseId)) throw Error('Unknown response');
    // Additional safety guard: neither model text nor server prose is displayed.
    return {responseId:value.responseId, source:value.source==='ai'?'ai':'offline'};
  } catch (_) { return localDecision(message); }
  finally { clearTimeout(timeout); }
}
