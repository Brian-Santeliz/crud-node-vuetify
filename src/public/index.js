const endPoint = "/api/libros";
new Vue({
  vuetify: new Vuetify(),
  el: "#main",
  data() {
    return {
      articulos: [
        {
          id: 2,
          descripcion: "ejemplo",
          precio: 212,
          stock: 232,
        },
        {
          id: 3,
          descripcion: "ejemplo",
          precio: 212,
          stock: 232,
        },
        {
          id: 4,
          descripcion: "ejemplo",
          precio: 212,
          stock: 232,
        },
      ],
      isModalOpen: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData: async function () {
      try {
        const res = await fetch(endPoint);
        const data = await res.json();
        this.articulos = data;
      } catch (error) {
        console.log("Ocurrio un error obteniendo la data", error);
      }
    },
    openModal: function () {
      this.isModalOpen = true;
    },
  },
});
