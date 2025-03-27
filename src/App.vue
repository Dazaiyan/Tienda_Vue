<template>
  <div class="store-container">
    <header class="store-header">
      <div class="header-content">
        <img src="@/assets/logo.png" alt="Logo Urban Threads" class="logo" />
        <div class="brand">
          <h1>Urban Threads</h1>
          <p>Moda Contemporánea | Calidad Premium</p>
        </div>
      </div>
    </header>

    <main class="product-showcase">
      <div class="hero-section">
        <div class="hero-text">
          <h2>Elegancia Minimalista</h2>
          <p>Descubre piezas esenciales diseñadas para durar</p>
        </div>
      </div>

      <div class="section-title">
        <div class="title-line"></div>
        <h3>COLECCIÓN PRINCIPAL</h3>
        <div class="title-line"></div>
      </div>

      <div class="product-grid">
        <div
          v-for="(producto, index) in productos"
          :key="producto.nombre"
          class="product-card"
          :class="{ 'product-unavailable': !producto.disponible }"
        >
          <div class="product-image-container">
            <img
              :src="producto.imagen"
              :alt="producto.nombre"
              class="product-image"
            />
            <div v-if="!producto.disponible" class="overlay-unavailable">
              AGOTADO
            </div>
          </div>

          <div class="product-details">
            <h2 class="product-name">{{ producto.nombre }}</h2>
            <p class="product-price">${{ producto.precio.toFixed(2) }}</p>

            <div class="product-meta">
              <span
                class="stock-indicator"
                :class="{
                  'low-stock': producto.stock > 0 && producto.stock <= 3,
                  'in-stock': producto.stock > 3,
                  'out-of-stock': producto.stock === 0,
                }"
              ></span>
              <span class="stock-text">{{
                producto.stock > 0 ? `${producto.stock} disponibles` : "Agotado"
              }}</span>
            </div>

            <div class="product-controls">
              <button
                @click="reducirStock(index)"
                :disabled="producto.stock === 0"
                class="btn btn-decrease"
              >
                -
              </button>
              <button @click="aumentarStock(index)" class="btn btn-increase">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="store-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Urban Threads</h4>
          <p>Moda esencial para el estilo contemporáneo</p>
        </div>
        <div class="footer-section">
          <h4>Contacto</h4>
          <p>info@urbanthreads.com</p>
          <p>+52 55 1234 5678</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2023 Urban Threads. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { reactive, watch } from "vue";

// Importación de imágenes
import camisaBlanca from "@/assets/camisa-blanca.png";
import jeansAzul from "@/assets/jeans-azul.png";
import chaquetaNegra from "@/assets/chaqueta-negra.png";
import vestidoFloral from "@/assets/vestido-floral.png";
import zapatillasNegras from "@/assets/zapatillas-negras.png";

export default {
  setup() {
    const productos = reactive([
      {
        nombre: "Camiseta Blanca Esencial",
        precio: 29.99,
        stock: 10,
        disponible: true,
        imagen: camisaBlanca,
      },
      {
        nombre: "Jeans Corte Clásico",
        precio: 89.99,
        stock: 5,
        disponible: true,
        imagen: jeansAzul,
      },
      {
        nombre: "Vestido Minimalista",
        precio: 59.99,
        stock: 0,
        disponible: false,
        imagen: vestidoFloral,
      },
      {
        nombre: "Chaqueta Urbana",
        precio: 129.99,
        stock: 2,
        disponible: true,
        imagen: chaquetaNegra,
      },
      {
        nombre: "Zapatillas Urbanas",
        precio: 79.99,
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

    // Watcher para actualizar disponibilidad
    watch(
      () => productos.map((p) => p.stock),
      (newStocks) => {
        newStocks.forEach((stock, index) => {
          productos[index].disponible = stock > 0;
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

<style scoped>
:root {
  --color-primary: #333333;
  --color-secondary: #555555;
  --color-accent: #8b8b8b;
  --color-light: #f8f8f8;
  --color-lighter: #ffffff;
  --color-dark: #222222;
  --color-border: #e0e0e0;
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: var(--color-primary);
  background-color: var(--color-light);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.store-container {
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.store-header {
  padding: 1.5rem 2rem;
  background-color: var(--color-lighter);
  border-bottom: 1px solid var(--color-border);
}

.header-content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  height: 40px;
  margin-right: 1.5rem;
}

.brand h1 {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 0.25rem;
  color: var(--color-dark);
}

.brand p {
  font-size: 0.85rem;
  color: var(--color-secondary);
  letter-spacing: 0.5px;
}

.hero-section {
  height: 400px;
  background-color: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
}

.hero-text {
  text-align: center;
  color: var(--color-lighter);
  z-index: 1;
  padding: 0 2rem;
}

.hero-text h2 {
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.hero-text p {
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0.9;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
}

.section-title h3 {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0 1.5rem;
  color: var(--color-secondary);
}

.title-line {
  flex-grow: 1;
  height: 1px;
  background-color: var(--color-border);
  max-width: 100px;
}

.product-showcase {
  flex: 1;
  padding: 0 2rem 4rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: var(--color-lighter);
  transition: var(--transition);
  border: 1px solid var(--color-border);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.product-image-container {
  position: relative;
  height: 350px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.product-card:hover .product-image {
  transform: scale(1.03);
}

.overlay-unavailable {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  letter-spacing: 1px;
}

.product-details {
  padding: 1.5rem;
}

.product-name {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.75rem;
  color: var(--color-dark);
}

.product-price {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
  color: var(--color-primary);
}

.product-meta {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.stock-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.in-stock {
  background-color: #a0a0a0;
}

.low-stock {
  background-color: #c0c0c0;
}

.out-of-stock {
  background-color: #e0e0e0;
}

.stock-text {
  font-size: 0.8rem;
  color: var(--color-secondary);
}

.product-controls {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  background: transparent;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  background-color: var(--color-light);
}

.btn-decrease {
  color: var(--color-secondary);
}

.btn-increase {
  color: var(--color-primary);
}

.store-footer {
  background-color: var(--color-dark);
  color: var(--color-lighter);
  padding: 3rem 2rem 0;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-section h4 {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.footer-section p {
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  opacity: 0.7;
  line-height: 1.6;
}

.footer-bottom {
  text-align: center;
  padding: 1.5rem 0;
}

.footer-bottom p {
  font-size: 0.8rem;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .hero-section {
    height: 300px;
  }

  .hero-text h2 {
    font-size: 2rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .logo {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 480px) {
  .store-header,
  .product-showcase {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .hero-section {
    height: 250px;
  }

  .hero-text h2 {
    font-size: 1.5rem;
  }

  .hero-text p {
    font-size: 1rem;
  }

  .section-title h3 {
    font-size: 0.8rem;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
