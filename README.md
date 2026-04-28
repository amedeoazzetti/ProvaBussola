# ProvaBussola

Single-page experience 3D in stile **dark luxury / cinematic**, costruita con:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Three Fiber + Drei + Three.js
- Framer Motion

L’app mostra una bussola 3D interattiva al centro: cliccando i punti cardinali (`N`, `S`, `E`, `W`) la bussola si sposta/zooma cinematicamente e il contenuto testuale cambia posizione. La lancetta Nord segue sempre il cursore con smoothing.

---

## Requisiti

- Node.js **18.18+** (consigliato Node.js 20 LTS)
- npm **9+**

Verifica versioni:

```bash
node -v
npm -v
```

---

## Avvio rapido (sviluppo)

1. Installa dipendenze:

```bash
npm install
```

2. Avvia il server di sviluppo:

```bash
npm run dev
```

3. Apri il browser su:

```text
http://localhost:3000
```

---

## Script disponibili

Nel progetto trovi questi script npm:

```bash
npm run dev     # avvia Next.js in sviluppo
npm run build   # build production
npm run start   # avvia l'app in modalità production (dopo build)
npm run lint    # lint del codice
```

---

## Workflow consigliato (production check)

Prima di considerare una modifica “pronta”:

1. Lint
```bash
npm run lint
```

2. Build di produzione
```bash
npm run build
```

3. Avvio produzione locale
```bash
npm run start
```

---

## Struttura progetto

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx

  components/
    CompassScene.tsx
    CompassModel.tsx
    CompassNeedle.tsx
    DirectionButton.tsx
    DirectionContent.tsx
    SceneCamera.tsx

  lib/
    compassConfig.ts
    animationConfig.ts
```

---

## Come modificare contenuti e layout

### 1) Testi delle sezioni
Modifica `directionContent` in:

- `src/lib/compassConfig.ts`

Puoi cambiare titolo/sottotitolo per:
- `center`
- `north`
- `south`
- `east`
- `west`

### 2) Posizioni/zoom bussola e contenuti
Modifica `directionLayout` in:

- `src/lib/compassConfig.ts`

Parametri principali:
- `compassAnchor` (x/y in percentuale viewport)
- `compassScale`
- `contentAnchorClass`
- `contentAlignClass`
- `buttonRingRadius`

### 3) Velocità/smoothing animazioni
Modifica `animationConfig` in:

- `src/lib/animationConfig.ts`

Parametri principali:
- `compassLerp`
- `needleLerp`
- `uiDuration`
- `uiEase`

---

## Personalizzazione grafica

### Tema globale
Aggiorna colori/background/noise in:

- `src/app/globals.css`

### Materiali 3D bussola/lancetta
Aggiorna materiali e geometrie in:

- `src/components/CompassModel.tsx`
- `src/components/CompassNeedle.tsx`

---

## Troubleshooting

### `npm install` fallisce con errori di rete / registry
- Verifica accesso a `https://registry.npmjs.org`
- Controlla proxy/firewall aziendale
- Riprova con cache pulita:

```bash
npm cache clean --force
npm install
```

### Porta 3000 già in uso
Avvia su un'altra porta:

```bash
npm run dev -- -p 3001
```

---

## Roadmap miglioramenti

- Sostituire la bussola procedurale con modello `.glb` PBR high-poly
- Aggiungere post-processing leggero (bloom/vignette) con bilanciamento performance
- Supporto gesture touch avanzate su mobile
- Aggiunta test e2e per interazioni direzionali

---

## Licenza

Uso interno / demo portfolio (adatta la licenza in base alle esigenze del progetto).
