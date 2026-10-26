// PREWRITTEN STUDENT-VISIBLE TEXT: qualified professional review needed before pilot use.
export const APPROVED=Object.freeze({
WELCOME:'Hi! I can help you choose a small study step, take a breathing break, or reflect on your day. How is studying going?',
EXAM_STRESS_01:'Tests can feel like a lot at once. Would you rather pick one topic to review or take a short break first?',
STRESS_01:'That sounds like a lot to juggle. Would a brief pause or choosing one small next step feel helpful?',
LOW_MOOD_01:'Thanks for sharing that. You do not need to handle everything by yourself. Would you like to reflect for a moment or reach out to someone you trust?',
LONELY_01:'Feeling disconnected can be difficult. Is there a friend, family member, or trusted adult you might want to check in with?',
TIRED_01:'It may be a good time to rest. If you want to study, would one small task be manageable?',
POSITIVE_01:'Glad to hear things are going well. Would you like to set a focus timer for one task?',
FOCUS_01:'You could choose one specific goal and try a short focus session. Want to open the timer?',
BREATH_01:'We have a gentle breathing guide in Tools. You can skip breath-holding if it feels uncomfortable.',
JOURNAL_01:'Would you like to write a few words about what felt difficult and what might help tomorrow?',
GENERAL_01:'Thanks for telling me. Would a focus timer, a short break, or a journal prompt be most useful?',
UNCERTAIN_01:'I might not have understood that correctly. Would you like a focus timer, a brief break, or a journal prompt?',
SAFETY_01:'I am concerned about your safety. Please contact a trusted adult or counselor now and tell them what is happening. If you might hurt yourself or are in immediate danger, call emergency services. In the U.S., call or text 988 for crisis support.'
});
export const RESPONSE_IDS=Object.freeze(Object.keys(APPROVED));
const urgentPatterns=[
/\b(?:kill|end|hurt)\s+(?:myself|me)\b/i,
/\b(?:suicid(?:e|al)|self[- ]?harm|overdos(?:e|ing)|want to die)\b/i,
/\b(?:don't want to live|do not want to live|wish i was dead|wish i were dead)\b/i,
/\b(?:someone (?:is )?(?:hurting|abusing) me|i am not safe|i'm not safe)\b/i,
/\b(?:kill|hurt)\s+(?:someone|them|him|her)\b/i
];
export function hasSafetySignal(input){return urgentPatterns.some(p=>p.test(String(input||'')));}
export function localDecision(input){
const t=String(input||'').toLowerCase();
if(hasSafetySignal(t))return {responseId:'SAFETY_01',source:'safety'};
if(/exam|test|quiz|final|grade|homework|assignment/.test(t)&&/stress|nerv|worri|panic|anxi|overwhelm|scared|freak/.test(t))return {responseId:'EXAM_STRESS_01',source:'offline'};
if(/stress|nerv|worri|panic|anxi|overwhelm|burn(?:ed|t) out|freak/.test(t))return {responseId:'STRESS_01',source:'offline'};
if(/alone|lonely|left out|no friends/.test(t))return {responseId:'LONELY_01',source:'offline'};
if(/sad|hopeless|down|cry|depress|unmotivated/.test(t))return {responseId:'LOW_MOOD_01',source:'offline'};
if(/tired|sleep|exhaust|fatigue/.test(t))return {responseId:'TIRED_01',source:'offline'};
if(/breath|calm down|reset/.test(t))return {responseId:'BREATH_01',source:'offline'};
if(/journal|reflect|write/.test(t))return {responseId:'JOURNAL_01',source:'offline'};
if(/focus|productiv|study|concentrat/.test(t))return {responseId:'FOCUS_01',source:'offline'};
if(/happy|good|great|ready|excited|confident/.test(t))return {responseId:'POSITIVE_01',source:'offline'};
return {responseId:'GENERAL_01',source:'offline'};
}
export function safeResponseForId(id){return Object.prototype.hasOwnProperty.call(APPROVED,id)?APPROVED[id]:APPROVED.UNCERTAIN_01;}
