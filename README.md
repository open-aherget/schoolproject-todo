# Schulprojekt

## Workflow für Entwicklung und Deployment

### Entwicklung (Local Dev):

Vite Dev Server starten: 
`npm run dev`
Docker muss den Port 5173 durchreichen. 
Zu ändern in der `/var/icc-docker/stacks/{stackname}/docker-compose.yml`
Beispiel, siehe unten.

Symfony Server starten:
`symfony server:start --listen-ip=0.0.0.0 --port=8000`

### Produktion (Deployment):

Assets kompilieren: 
`npm run build`

Die generierten Build-Artefakte landen in public/build/ und werden über das Twig-Bundle automatisch eingebunden.

Ports der Docker Stacks _phphubspot_:

ports:
- "80:80"
- "443:443"
- "8000:8000"
- "5173:5173"