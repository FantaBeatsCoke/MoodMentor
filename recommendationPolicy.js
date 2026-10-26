// Rule-based, prewritten activity suggestions (not AI-generated).
const RECOMMENDATIONS = Object.freeze({
  great: [{id:'great-focus',icon:'⏱️',title:'25-minute focus timer',detail:'Use that energy for one study goal.',tab:'Tools',page:'timer',minutes:25},{id:'great-music',icon:'🎧',title:'Focus sounds',detail:'Set up a soundtrack for studying.',tab:'Tools',page:'music'}],
  good: [{id:'good-focus',icon:'⏱️',title:'25-minute focus timer',detail:'Choose one task and get started.',tab:'Tools',page:'timer',minutes:25},{id:'good-music',icon:'🎧',title:'Focus sounds',detail:'Try background music as you work.',tab:'Tools',page:'music'}],
  okay: [{id:'okay-focus',icon:'⏱️',title:'10-minute focus timer',detail:'Start with a smaller study session.',tab:'Tools',page:'timer',minutes:10},{id:'okay-journal',icon:'📓',title:'Quick reflection',detail:'Write down one thing on your mind.',tab:'Journal'}],
  stressed: [{id:'stressed-breathe',icon:'🌬️',title:'Breathing reset',detail:'Try a gentle pause; skip holding your breath if uncomfortable.',tab:'Tools',page:'breathing'},{id:'stressed-journal',icon:'📓',title:'Reflect for a moment',detail:'Write down what feels most pressing.',tab:'Journal'}],
  down: [{id:'down-journal',icon:'📓',title:'Gentle reflection',detail:'Put your thoughts into words, if you want to.',tab:'Journal'},{id:'down-music',icon:'🎧',title:'Calm sounds',detail:'Listen to something soothing if that feels helpful.',tab:'Tools',page:'music'}]
});
const INTROS={great:'You seem ready to make progress. Pick one manageable goal.',good:'Feeling positive? Here are two ways to ease into studying.',okay:'No need to push too hard. Starting small is an option.',stressed:'A brief reset might help before choosing your next step.',down:'It is okay to go gently. Choose what feels useful, or skip both.'};
export function recommendationsForMood(id){return RECOMMENDATIONS[id]||[];}
export function introForMood(id){return INTROS[id]||'';}
