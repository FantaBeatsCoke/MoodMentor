// Backend response IDs must match ../responsePolicy.js.
const VALID_IDS=['WELCOME','EXAM_STRESS_01','STRESS_01','LOW_MOOD_01','LONELY_01','TIRED_01','POSITIVE_01','FOCUS_01','BREATH_01','JOURNAL_01','GENERAL_01','UNCERTAIN_01','SAFETY_01'];
function isAllowed(id){return VALID_IDS.includes(id)}
const safetySignal=t=>[/\b(?:kill|end|hurt)\s+(?:myself|me)\b/i,/\b(?:suicid(?:e|al)|self[- ]?harm|overdos(?:e|ing)|want to die)\b/i,/\b(?:don't want to live|do not want to live|wish i was dead|wish i were dead)\b/i,/\b(?:someone (?:is )?(?:hurting|abusing) me|i am not safe|i'm not safe)\b/i,/\b(?:kill|hurt)\s+(?:someone|them|him|her)\b/i].some(r=>r.test(t));
function classifyFallback(t){
t=t.toLowerCase();
if(safetySignal(t))return 'SAFETY_01';
if(/exam|test|quiz|final|grade|homework|assignment/.test(t)&&/stress|nerv|worri|panic|anxi|overwhelm|scared|freak/.test(t))return 'EXAM_STRESS_01';
if(/stress|nerv|worri|panic|anxi|overwhelm|burn(?:ed|t) out|freak/.test(t))return 'STRESS_01';
if(/alone|lonely|left out|no friends/.test(t))return 'LONELY_01';
if(/sad|hopeless|down|cry|depress|unmotivated/.test(t))return 'LOW_MOOD_01';
if(/tired|sleep|exhaust|fatigue/.test(t))return 'TIRED_01';
if(/breath|calm down|reset/.test(t))return 'BREATH_01';
if(/journal|reflect|write/.test(t))return 'JOURNAL_01';
if(/focus|productiv|study|concentrat/.test(t))return 'FOCUS_01';
if(/happy|good|great|ready|excited|confident/.test(t))return 'POSITIVE_01';
return 'GENERAL_01';
}
module.exports={VALID_IDS,isAllowed,safetySignal,classifyFallback};
