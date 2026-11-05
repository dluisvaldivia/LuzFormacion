# DESIGN — Luz Formación (demo)

Dirección: **editorial suizo, simple**. Poco texto, mucho valor: una idea por bloque, y un
icono o una foto que la cuente. Rojo y amarillo sobre crema.

## Reglas
- **Radio 0** en todo el sitio. Única excepción: `src/components/chat/` (lo redondo y la
  aurora son la señal «esto es IA»).
- **Filetes, no tarjetas.** Secciones separadas por 1px `ink` (`SectionHeading`); listas como
  filas con `divide-line`.
- **Sin sombras.** Hover = fondo plano (`cream-deep`) o inversión tinta/crema.
- **Logo:** dos cuadrados iguales desplazados en diagonal, con el cruce en `brand-red-dark`,
  para que se lean como un cubo. Girado 4°. Geometría en `ui/Square.tsx`.
- **Ornamento:** `Square` para viñetas y nav activa (ángulos 0° y 4°); `LogoMark` en el
  titular del hero y el footer.
- **Fotos:** de Unsplash, vía `ui/Photo.tsx` y `npm run photos`. Crédito siempre en el pie.
  Sin filtros ni texto encima.
- **Iconos:** Lucide (`react-icons/lu`), en `IconBox` cuando encabezan un bloque.
- **Movimiento:** un solo gesto: el cubo del hero entra girando hasta su sitio.
- **Tipografía:** Archivo. Titulares a `font-stretch` 112–125 %, tracking negativo;
  cuerpo a 100 %. `tabular-nums` en fechas y horas. Display máx. 6rem.
- **Color:** rojo = acción; amarillo = resaltado y bloque final de llamada a la acción.
  Texto rojo sobre crema siempre `brand-red-deep`; sobre amarillo siempre `ink`.
- **Texto:** titular de pocas palabras y, como mucho, una línea debajo.
- **No usar:** eyebrows encima de titulares, numeración 01/02 de secciones, sombras
  duras desplazadas, `rounded-*` fuera del chat.
