<template>
  <div id="app">
    <header class="header">
      <h1>Tienda Online de Ropa</h1>
      <p>Moda y estilo a tu alcance</p>
    </header>

    <div class="product-list">
      <div
        v-for="(producto, index) in productos"
        :key="index"
        class="product-card"
      >
        <div class="product-image">
          <img :src="producto.imagen" :alt="producto.nombre" />
        </div>
        <div class="product-info">
          <h2>{{ producto.nombre }}</h2>
          <p class="price">${{ producto.precio }}</p>
          <p class="stock" :class="{ 'out-of-stock': !producto.disponible }">
            Stock: {{ producto.stock }}
          </p>
          <p
            class="availability"
            :class="{
              available: producto.disponible,
              unavailable: !producto.disponible,
            }"
          >
            {{ producto.disponible ? "Disponible" : "Agotado" }}
          </p>
        </div>
        <div class="product-actions">
          <button @click="reducirStock(index)" class="btn reduce">
            Reducir Stock
          </button>
          <button @click="aumentarStock(index)" class="btn increase">
            Aumentar Stock
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";

import camisaBlanca from "@/assets/camisa-blanca.png";
import jeansAzul from "@/assets/jeans-azul.png";
import chaquetaNegra from "@/assets/chaqueta-negra.png";
import vestidoFloral from "@/assets/vestido-floral.png";
import zapatillasNegras from "@/assets/zapatillas-negras.png";

export default {
  setup() {
    const productos = reactive([
      {
        nombre: "Camiseta Básica Blanca",
        precio: 25,
        stock: 10,
        disponible: true,
        imagen: camisaBlanca,
      },
      {
        nombre: "Jeans Slim Fit Azul",
        precio: 50,
        stock: 5,
        disponible: true,
        imagen: jeansAzul,
      },
      {
        nombre: "Chaqueta de Cuero Negra",
        precio: 120,
        stock: 2,
        disponible: true,
        imagen: chaquetaNegra,
      },
      {
        nombre: "Vestido Floral Veraniego",
        precio: 45,
        stock: 0,
        disponible: false,
        imagen: vestidoFloral,
      },
      {
        nombre: "Zapatillas Deportivas Negras",
        precio: 80,
        stock: 8,
        disponible: true,
        imagen: zapatillasNegras,
      },
    ]);

    const reducirStock = (index) => {
      if (productos[index].stock > 0) {
        productos[index].stock--;
      }
    };

    const aumentarStock = (index) => {
      productos[index].stock++;
    };

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

    return {
      productos,
      reducirStock,
      aumentarStock,
    };
  },
};
</script>

<style>
/* Estilos generales */
body {
  font-family: "Arial", sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
  color: #333;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Estilos del encabezado */
.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.2rem;
  color: #666;
}

/* Estilos de la lista de productos */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-image img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.product-info {
  text-align: center;
}

.product-info h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.product-info .price {
  font-size: 1.2rem;
  color: #27ae60;
  font-weight: bold;
}

.product-info .stock {
  font-size: 1rem;
  color: #666;
}

.product-info .stock.out-of-stock {
  color: #e74c3c;
}

.product-info .availability {
  font-size: 1rem;
  font-weight: bold;
}

.product-info .availability.available {
  color: #27ae60;
}

.product-info .availability.unavailable {
  color: #e74c3c;
}

/* Estilos de los botones */
.product-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn.reduce {
  background-color: #e74c3c;
  color: #fff;
}

.btn.reduce:hover {
  background-color: #c0392b;
}

.btn.increase {
  background-color: #2ecc71;
  color: #fff;
}

.btn.increase:hover {
  background-color: #27ae60;
}
</style>
