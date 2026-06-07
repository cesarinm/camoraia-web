# CAMORA IA — Sitio Web Oficial
**camoraia.com** — Landing page estática · GitHub + Netlify

## Archivos
- `index.html` — Página principal completa
- `styles.css` — Estilos (664 líneas, responsive)
- `script.js` — Interactividad y formulario Netlify
- `netlify.toml` — Configuración de deploy y headers

## Cambiar datos de contacto
Editar en `script.js` el objeto CONFIG (línea ~5):
```js
const CONFIG = {
  whatsapp: "573006526432",   // ← cambiar aquí
  email: "contacto@camoraia.com",
  instagram: "https://instagram.com/camora.ia.colombia",
};
```

## Publicar en Netlify
1. Subir esta carpeta a GitHub como repositorio público o privado
2. En app.netlify.com → Add new site → Import from GitHub
3. Build command: (vacío) · Publish directory: `.`
4. Deploy site

## Conectar camoraia.com desde GoDaddy → Netlify
En Netlify: Site settings → Domain management → Add domain → camoraia.com
Netlify dará valores DNS. En GoDaddy DNS:
- Registro A: @ → IP de Netlify
- Registro CNAME: www → [tu-sitio].netlify.app
Propagación: 1-24 horas.
