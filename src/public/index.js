const endPoint = "/api/libros";
new Vue({
  vuetify: new Vuetify(),
  el: "#main",
  data() {
    return {
      valid: true,
      libros: [],
      isModalOpen: false,
      actions: null,
      id: null,
      titulo: "",
      autor: "",
      anio: "",
      rules: [
        (value) => !!value || "Campo Requerido.",
        (value) => (value && value.length >= 3) || "Minimo 3 caracteres.",
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getData: async function () {
      try {
        const res = await fetch(endPoint);
        const data = await res.json();
        this.libros = data;
      } catch (error) {
        console.log("Ocurrio un error obteniendo la data", error);
      }
    },
    openModal: function () {
      this.isModalOpen = true;
      this.actions = 1;
      (this.autor = ""), (this.anio = ""), (this.titulo = "");
    },
    closeModal: function () {
      this.isModalOpen = false;
      this.resetValidation();
    },
    actionButton: function () {
      this.actions === 1 ? this.saveBook() : this.updateBook();
      this.isModalOpen = false;
    },
    saveBook: async function () {
      try {
        if (
          this.autor.trim() === "" ||
          this.titulo.trim() === "" ||
          this.anio.trim() === ""
        )
          return;
        const data = {
          autor: this.autor,
          titulo: this.titulo,
          año: this.anio,
        };
        await fetch(endPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        Swal.fire("Guardado!", "Libro agregado correctamente!", "success");
        await this.getData();
        this.resetValidation();
        (this.autor = ""), (this.anio = ""), (this.titulo = "");
      } catch (error) {
        console.log("Ocurrio un error enviando la data", error);
      }
    },
    deleteAction: function (id) {
      try {
        Swal.fire({
          title: "Eliminar",
          text: "¿Está seguro en eliminar este libro?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Eliminar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await fetch(`${endPoint}/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            Swal.fire("Eliminado", "Libro eliminado correctamente!", "success");
            await this.getData();
          }
        });
      } catch (error) {
        console.log("Ocurrio un error eliminando la data", error);
      }
    },
    editAction: function (...data) {
      const [id, titulo, autor, anio] = data;
      this.isModalOpen = true;
      this.actions = 2;
      this.anio = anio;
      this.titulo = titulo;
      this.autor = autor;
      this.id = id;
    },
    updateBook: async function () {
      const data = {
        autor: this.autor,
        titulo: this.titulo,
        año: this.anio,
      };
      try {
        if (
          this.autor.trim() === "" ||
          this.titulo.trim() === "" ||
          this.anio.trim() === ""
        )
          return;
        await fetch(`${endPoint}/${this.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        Swal.fire("Actualizado", "Libro actualizado correctamente!", "success");
        await this.getData();
        (this.autor = ""), (this.anio = ""), (this.titulo = "");
        this.resetValidation();
      } catch (error) {
        this.resetValidation();
        console.log("Error actualizando la data", error);
      }
    },
  },
});
