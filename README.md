# MoodMentor 2.0 — iPhone Expo prototype

MoodMentor is a student study companion with local-first mood tracking, mood-based activity recommendations, a guided breathing exercise, Pomodoro timer, journal, and AI-powered classification of chat messages. It is **not** a therapist, mental health treatment, diagnosis, or guaranteed-safe intervention.

## Run on your iPhone

Install Node.js and Expo Go on your iPhone. In this repository, run:

```bash
npm install
npx expo install --fix
npx expo start --clear
```

Scan the QR code on your iPhone with Expo Go. The app works without an API key using local fallback response selection. Phone and Mac should be on the same Wi-Fi network.

## Enable optional AI interpretation

Never place your OpenAI key in client code, `.env.local`, or an `EXPO_PUBLIC_` variable. From a separate Terminal on your Mac:

```bash
cd server
OPENAI_API_KEY='your-private-api-key' node index.js
```

In the **root** of the app, create a local (untracked) `.env.local` file with **only the backend URL**:

```env
EXPO_PUBLIC_MOODMENTOR_API_URL=http://YOUR_MAC_LAN_IP:8787
```

Restart Expo with `npx expo start --clear`. Open Chat and explicitly enable AI classification. To verify the server, open `http://YOUR_MAC_LAN_IP:8787/health` on the phone; `aiConfigured: true` means a key is configured, not that a model call has succeeded.

The AI chooses a **response ID only**. Student-facing messages are authored in `responsePolicy.js`, with an offline fallback and additional safety routing. Home activity suggestions are predefined in `recommendationPolicy.js`; they do not use the AI. AI opt-in is reset when the app restarts.

## Tests

```bash
node server/test.js
```

## Student safety and privacy

- The response library is **prewritten, not professionally vetted**. Get qualified youth mental-health review and conduct safety evaluations before real student testing.
- Chat content stays on the device unless the user explicitly enables AI, in which case new messages are sent to the backend and potentially OpenAI for classification.
- The HTTP LAN development server is intended only for supervised demos. Public deployment needs HTTPS, authentication, abuse protections, data-minimization, consent, privacy review, and a tested crisis escalation policy.
- Never publish any API key, `.env`, or `.env.local` file.
- The project is a prototype, not a crisis-response service or replacement for trusted adults or mental-health professionals.
