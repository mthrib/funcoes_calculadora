let tipoFuncao = '';
let grafico;

function setFunctionType(tipo) {
  tipoFuncao = tipo;
  const inputDiv = document.getElementById('inputs');
  inputDiv.innerHTML = '';

  if (tipo === 'afim') {
    inputDiv.innerHTML = `
      <p>y = ax + b</p>
      <input type="number" id="aAfim" placeholder="Coeficiente a" />
      <input type="number" id="bAfim" placeholder="Coeficiente b" />
      <input type="number" id="xMinAfim" placeholder="x mínimo" />
      <input type="number" id="xMaxAfim" placeholder="x máximo" />
    `;
  } else if (tipo === 'exponencial') {
    inputDiv.innerHTML = `
      <p>y = a · b<sup>x</sup></p>
      <input type="number" id="aExp" placeholder="Coeficiente a" />
      <input type="number" id="bExp" placeholder="Base b" />
      <input type="number" id="xMinExp" placeholder="x mínimo" />
      <input type="number" id="xMaxExp" placeholder="x máximo" />
    `;
  }
}

function gerarGrafico() {
  let a, b, xMin, xMax;

  if (tipoFuncao === 'afim') {
    a = parseFloat(document.getElementById('aAfim')?.value);
    b = parseFloat(document.getElementById('bAfim')?.value);
    xMin = parseInt(document.getElementById('xMinAfim')?.value);
    xMax = parseInt(document.getElementById('xMaxAfim')?.value);
  } else if (tipoFuncao === 'exponencial') {
    a = parseFloat(document.getElementById('aExp')?.value);
    b = parseFloat(document.getElementById('bExp')?.value);
    xMin = parseInt(document.getElementById('xMinExp')?.value);
    xMax = parseInt(document.getElementById('xMaxExp')?.value);
  } else {
    alert("Selecione um tipo de função primeiro!");
    return;
  }

  if ([a, b, xMin, xMax].some(v => isNaN(v))) {
    alert("Por favor, preencha todos os campos corretamente!");
    return;
  }

  if (xMin >= xMax) {
    alert("x mínimo deve ser menor que x máximo!");
    return;
  }

  const x = [];
  const y = [];

  for (let i = xMin; i <= xMax; i++) {
    x.push(i);
    if (tipoFuncao === 'afim') {
      y.push(a * i + b);
    } else if (tipoFuncao === 'exponencial') {
      y.push(a * Math.pow(b, i));
    }
  }

  const ctx = document.getElementById('grafico').getContext('2d');

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [{
        label: tipoFuncao === 'afim'
          ? `Função Afim: y = ${a}x + ${b}`
          : `Função Exponencial: y = ${a}·${b}^x`,
        data: y,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        pointBackgroundColor: '#2563eb',
        fill: true,
        tension: 0.25,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'x',
            color: '#555'
          },
          grid: {
            color: '#eee'
          }
        },
        y: {
          title: {
            display: true,
            text: 'y',
            color: '#555'
          },
          grid: {
            color: '#eee'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#333'
          }
        }
      }
    }
  });
}
