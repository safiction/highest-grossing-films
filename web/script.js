let allData = [];

fetch("../movies.json")
  .then(res => res.json())
  .then(data => {
      allData = data;
      updateUI();
  });

document.getElementById("yearRange").addEventListener("input", (e) => {
    document.getElementById("yearValue").textContent = e.target.value;
    updateUI();
});

function updateUI() {
    let data = [...allData];

    const maxYear = document.getElementById("yearRange").value;

    if (maxYear) {
        data = data.filter(f => f.release_year <= maxYear);
    }

    renderTop5(data);
    renderDirectors(data);
    drawGenres(data);
    drawScatter(data);
    renderAvgDuration(data);
}

function renderAvgDuration(data) {
    const el = document.getElementById("avgDuration");

    if (data.length === 0) {
        el.innerHTML = "Avg duration: —";
        return;
    }

    const total = data.reduce((sum, f) => sum + (f.duration_minutes || 0), 0);
    const avg = Math.round(total / data.length);

    el.innerHTML = `
        <div style="font-size:14px; color:#888;">Average Duration</div>
        <div style="font-size:32px; margin-top:5px;">${avg} min</div>
    `;
}

function renderTop5(data) {
    const top5 = [...data]
        .sort((a, b) => b.box_office - a.box_office)
        .slice(0, 5);

    const container = document.getElementById("top5");
    container.innerHTML = "";

    top5.forEach(f => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${f.title}</h3>
            <p><b>Year:</b> ${f.release_year}</p>
            <p><b>Director:</b> ${f.director}</p>
            <p><b>Duration:</b> ${f.duration_minutes} min</p>
            <p><b>Language:</b> ${f.language}</p>
            <p><b>Country:</b> ${f.country}</p>
            <p><b>Genres:</b> ${f.genre.split(",").map(g => g.trim()).join(", ")}</p>
            <p><b>Revenue:</b> $${f.box_office.toLocaleString()}</p>
        `;

        container.appendChild(div);
    });
}

function renderDirectors(data) {
    const map = {};

    data.forEach(f => {
        if (!f.director) return;

        f.director.split(",").forEach(d => {
            d = d.trim();
            map[d] = (map[d] || 0) + 1;
        });
    });

    const top = Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const container = document.getElementById("directors");
    container.innerHTML = top.map(d => `${d[0]} (${d[1]})`).join("<br>");
}

function drawGenres(data) {
    const stats = {};

    data.forEach(f => {
        if (!f.genre) return;

        f.genre.split(",").forEach(g => {
            g = g.trim();
            stats[g] = (stats[g] || 0) + 1;
        });
    });

    const labels = Object.keys(stats);
    const values = Object.values(stats);

    const canvas = document.getElementById("genreChart");
    const ctx = canvas.getContext("2d");

    if (window.genreChart && typeof window.genreChart.destroy === "function") {
        window.genreChart.destroy();
    }

    window.genreChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: "Movies Released",
                data: values
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
    }
    });
}

function drawScatter(data) {
    const canvas = document.getElementById("scatterChart");
    const ctx = canvas.getContext("2d");

    if (window.scatterChart && typeof window.scatterChart.destroy === "function") {
        window.scatterChart.destroy();
    }

    const map = {};

    data.forEach(f => {
        if (!map[f.release_year]) map[f.release_year] = 0;
        map[f.release_year] += 1;
    });

    const labels = Object.keys(map).sort();
    const values = labels.map(y => map[y]);

    window.scatterChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: "Number of Films",
                data: values
            }]
        }
    });
}