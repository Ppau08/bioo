let estadoMaterias = {}; // id: estado ("bloqueada", "habilitada", "regularizada", "aprobada")

function crearMalla() {
  const grid = document.getElementById("grid");

  malla.forEach((anioData, index) => {
    const year = document.createElement("div");
    year.className = "year";
    year.innerHTML = `<h2>${index + 1}° Año</h2>`;

    anioData.cuatrimestres.forEach((cuat, i) => {
      const quarter = document.createElement("div");
      quarter.className = "quarter";
      cuat.materias.forEach((materia) => {
        const div = document.createElement("div");
        div.className = "subject bloqueada";
        div.innerText = materia.nombre;
        div.dataset.id = materia.id;
        div.dataset.estado = "bloqueada";

        div.addEventListener("click", () => avanzarEstado(div, materia));
        quarter.appendChild(div);
        estadoMaterias[materia.id] = "bloqueada";
      });
      year.appendChild(quarter);
    });

    grid.appendChild(year);
  });

  actualizarEstados();
}

function avanzarEstado(div, materia) {
  const id = materia.id;
  let estado = estadoMaterias[id];

  if (estado === "bloqueada") return;

  if (estado === "habilitada") {
    estadoMaterias[id] = "regularizada";
  } else if (estado === "regularizada") {
    estadoMaterias[id] = "aprobada";
  } else if (estado === "aprobada") {
    estadoMaterias[id] = "habilitada";
  }

  actualizarEstados();
}

function actualizarEstados() {
  document.querySelectorAll(".subject").forEach((div) => {
    const id = div.dataset.id;
    const estado = estadoMaterias[id];
    div.className = "subject " + estado;
    div.dataset.estado = estado;
  });

  desbloquearCorrelativas();
  actualizarProgreso();
}

function desbloquearCorrelativas() {
  for (const anio of malla) {
    for (const cuat of anio.cuatrimestres) {
      for (const mat of cuat.materias) {
        if (estadoMaterias[mat.id] === "bloqueada") {
          const desbloqueada = mat.correlativas.every(
            (cor) =>
              estadoMaterias[cor] === "regularizada" || estadoMaterias[cor] === "aprobada"
          );
          if (desbloqueada) {
            estadoMaterias[mat.id] = "habilitada";
          }
        }
      }
    }
  }
}

function actualizarProgreso() {
  const total = Object.keys(estadoMaterias).length;
  const completadas = Object.values(estadoMaterias).filter(e => e === "aprobada").length;
  const porcentaje = Math.round((completadas / total) * 100);
  document.getElementById("progress-bar").style.width = `${porcentaje}%`;
  document.getElementById("progress-text").innerText = `Progreso: ${porcentaje}%`;
}

crearMalla();
