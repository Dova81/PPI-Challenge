# PPI Challenge – Conversor de Monedas (Next.js)

Aplicación web para convertir divisas usando el tipo de cambio mid‑market del proveedor público VAT Comply. Construida con Next.js (App Router), TypeScript, Tailwind CSS 4 y React Query.

## Requisitos

- Node.js 18.18+ o 20+ (recomendado LTS)
- npm 9+ (o yarn/pnpm en su defecto)
- Acceso a Internet (la app consulta una API pública)

## Puesta en marcha (desarrollo)

1) Instalar dependencias

```powershell
npm install
```

2) Levantar el servidor de desarrollo

```powershell
npm run dev
```

3) Abrir el navegador en:

- http://localhost:3000

Opcional: cambiar el puerto (por ejemplo 4000)

```powershell
npm run dev -- -p 4000
```

## Build y producción

Generar el build optimizado y levantar en modo producción:

```powershell
npm run build
npm start
```

Por defecto se sirve en http://localhost:3000.

## Scripts disponibles

- `npm run dev`: servidor de desarrollo con Turbopack.
- `npm run build`: compila la app para producción.
- `npm start`: inicia el servidor en modo producción.
- `npm run lint`: corre ESLint sobre el proyecto.
- `npm run lint:fix`: corrige problemas auto‑arreglables.
- `npm run format`: aplica Prettier a los archivos del repo.

## Estructura del proyecto

```
src/
  app/                     # Rutas App Router y API Routes
    api/
      currencies/route.ts  # GET /api/currencies
      rates/route.ts       # GET /api/rates?base=EUR
  components/
    currencyConverter/     # UI del conversor y subcomponentes
  hooks/
    useCurrencyData.ts     # Hook con React Query para tasas/monedas
  lib/                     # Utilidades (formato, estilos, símbolos)
  services/
    exchange.ts            # Llamadas a la API pública (cliente)

public/                    # Assets estáticos
next.config.ts             # Configuración de Next.js
tsconfig.json              # Configuración de TypeScript
package.json               # Scripts y dependencias
```

## ¿Cómo usar la aplicación?

Pantalla principal: Conversor de monedas.

1) Ingrese el monto en “Amount”.
2) Seleccione la divisa de origen en “From”.
3) Seleccione la divisa de destino en “To”.
4) Use el botón con flechas para intercambiar (“swap”) origen ↔ destino.

La conversión se calcula en tiempo real usando la tasa mid‑market. Debajo se muestran:

- Resultado convertido con símbolo de la divisa
- Relación inversa (1 destino = X origen)
- Fecha y hora de la última actualización de tasas
- Indicadores de “Loading…” y mensajes de error si falla la carga

Notas sobre el cálculo:

- Si la tasa base coincide con “From”, se toma `rates[to]` directamente.
- Si la tasa base coincide con “To”, se usa el inverso `1 / rates[from]`.
- En el resto de los casos, se triangula: `(1 / rates[from]) * rates[to]`.

## Datos y APIs

La UI obtiene datos vía React Query desde `src/services/exchange.ts`, que actualmente consulta directamente la API pública de VAT Comply desde el navegador:

- Tasas: `https://api.vatcomply.com/rates?base={BASE}`
- Monedas: `https://api.vatcomply.com/currencies`

El proyecto también expone endpoints internos (API Routes de Next.js) que puede usar si prefiere enrutar a través del servidor de Next:

- `GET /api/rates?base=EUR` → Proxy de tasas del proveedor
- `GET /api/currencies` → Lista simplificada: `{ currencies: Array<{ code, label, symbol }> }`

Importante: El formato de `/api/currencies` es distinto al del proveedor. Si desea que la UI consuma los endpoints internos, adapte `src/services/exchange.ts` para usar `/api/rates` y armonice la forma de las monedas.

## Personalización y puntos clave del código

- UI principal: `src/components/currencyConverter/CurrencyConverter.tsx`
- Hook de datos: `src/hooks/useCurrencyData.ts` (usa @tanstack/react-query)
- Servicio de datos: `src/services/exchange.ts`
- Símbolos/etiquetas: `src/lib/currency.ts`

## Solución de problemas

- Puerto ocupado: cambie el puerto con `npm run dev -- -p 4000`.
- Errores de red/CORS: la app llama al proveedor externo desde el cliente; si su red bloquea solicitudes cross‑origin, cambie a los endpoints internos (`/api/*`) y ajuste el servicio.
- Tipos/ESLint: ejecute `npm run lint` y `npm run format`.
- Dependencias: borre `node_modules` y reinstale `npm install` si algo quedó en estado inconsistente.

## Licencia

Este proyecto es para fines de desafío técnico. Revise las condiciones del proveedor VAT Comply para el uso de su API.

