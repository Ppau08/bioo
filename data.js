const malla = [
  {
    anio: 1,
    cuatrimestres: [
      {
        materias: [
          { id: "algebra", nombre: "Álgebra y Geometría Analítica", correlativas: [] },
          { id: "quimica_general", nombre: "Química General", correlativas: [] },
        ],
      },
      {
        materias: [
          { id: "calculo", nombre: "Cálculo Dif. e Integral", correlativas: ["algebra"] },
          { id: "quimica_inorganica", nombre: "Química Inorgánica", correlativas: ["quimica_general"] },
          { id: "biologia", nombre: "Biología General y Celular", correlativas: ["quimica_general"] },
        ],
      },
    ],
  },
  // Agregar años 2 a 6 de forma similar
];
