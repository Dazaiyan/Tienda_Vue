# vue-inventario

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# Respuestas a las Preguntas
### *1. Vue no detecta cambios dentro de objetos reactivos de la forma que esperarías. ¿Cómo podrías observar un cambio en una propiedad anidada?*
- Para observar cambios en propiedades anidadas dentro de un objeto reactivo, puedes usar `watch()` con la opción `deep: true`. Esto permite que Vue observe cambios en propiedades anidadas dentro del objeto.
```
watch(
      () => productos.map((p) => p.stock),
      (newStocks, oldStocks) => {
        newStocks.forEach((stock, index) => {
          if (stock === 0) {
            productos[index].disponible = false;
          } else if (oldStocks[index] === 0 && stock > 0) {
            productos[index].disponible = true;
          }
        });
      },
      { deep: true }
    );
```
### *2. watch() permite escuchar cambios en propiedades específicas dentro de reactive(), explica cómo funciona.*
- `watch()` es una función que toma dos argumentos principales: una función getter que devuelve el valor que quieres observar, y una función de callback que se ejecuta cuando ese valor cambia. También puedes pasar un tercer argumento con opciones, como deep: true para observar cambios profundos en objetos anidados.

### *3. ¿Cómo harías que un watch() detecte cambios en stock dentro de un array de productos?*
- Para detectar cambios en la propiedad stock dentro de un array de productos, puedes usar `watch()` para observar un array de los valores de stock de cada producto. Cuando el stock de cualquier producto cambie, el callback de `watch()` se ejecutará, permitiéndote actualizar la propiedad disponible en consecuencia. Algo asi:
```
import { reactive, watch } from 'vue';

const productos = reactive([
  { nombre: 'Camiseta', precio: 25, stock: 10, disponible: true },
  { nombre: 'Jeans', precio: 50, stock: 5, disponible: true },
  { nombre: 'Chaqueta', precio: 120, stock: 0, disponible: false },
]);

watch(
  () => productos.map(p => p.stock), // Observar el array de stocks
  (nuevosStocks, viejosStocks) => {
    nuevosStocks.forEach((stock, index) => {
      if (stock === 0) {
        productos[index].disponible = false;
      } else if (viejosStocks[index] === 0 && stock > 0) {
        productos[index].disponible = true;
      }
    });
  },
  { deep: true }
);
```

