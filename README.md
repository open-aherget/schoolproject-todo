# Schul Prohekt ToDo

## Workflow für Entwicklung und Deployment

### Entwicklung (Local Dev):

Vite Dev Server starten: 
`npm run dev`

Symfony Server starten:
`symfony server:start --listen-ip=0.0.0.0 --port=8000`

### Produktion (Deployment):

Assets kompilieren: 
`npm run build`

Die generierten Build-Artefakte landen in public/build/ und werden über das Twig-Bundle automatisch eingebunden.